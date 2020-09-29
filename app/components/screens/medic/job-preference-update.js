import * as React from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';
import {getMe} from '../../../services/me/me';
import {getJobPreference, updateJobPreference} from '../../../services/medic/job-preferences';
import {getRegions, getMedicRoles} from '../../../services/misc/regions-and-medic-roles';
import {formatPrice, validatePrice, validateInteger} from '../../global/helpers';
import styles from '../../../assets/styles/medic/jobPreferenceUpdateStyles'
import formStyles from '../../../assets/styles/form-styles'
import screenStyles from '../../../assets/styles/layout/screen-styles'
import * as Images from '../../../assets/images'
import ScreenHeader from '../../global/screen-header'
import FormPaginator from '../../global/form-paginator'
import FormErrors from '../../global/form-errors'

const {regionMap} = Images

function JobPreferenceUpdateScreen({navigation}) {

    const [page, setPage] = React.useState(1);
    const [topText, setTopText] = React.useState('');
    const [available_medic_roles, setAvailableMedicRoles] = React.useState([]);
    const [available_regions, setAvailableRegions] = React.useState([]);
    const [allowedAdditionalMedicRoles, setAllowedAdditionaMedicRoles] = React.useState(true);
    const [allowedAdditionalRegions, setAllowedAdditionalRegions] = React.useState(true);
	const [form, setFormValues] = React.useState({
        hours_required: '',
        primary_medic_role_id: '',
        primary_medic_role_rate_per_hour: '0.00',
        primary_region_id: '',
    });
    const [additionalMedicRoles, setAdditionalMedicRoles] = React.useState([]);
    const [additionalRegions, setAdditionalRegions] = React.useState([]);
    const [additionalMedicRolesRatePerHour, setAdditionalMedicRolesRatePerHour] = React.useState([]);
    const [formErrors, setFormErrors] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            loadRegions();
            loadMedicRoles();
            loadAccess();
            loadJobPreference();
            setPage(1);
            updateTopText(1);
        }, [])
    );

    const loadRegions = () => {
        getRegions()
        .then(( response ) => {
            for (index = 0; index < response.length; ++index) {
                response[index].name = response[index].id + '. ' + response[index].name;
            }
            setAvailableRegions(response);
        })
        .catch(( error ) => {});
    }

    const loadMedicRoles = () => {
        getMedicRoles()
        .then(( response ) => {
            setAvailableMedicRoles(response);
        })
        .catch(( error ) => {});
    }

    const loadAccess = () => {
        getMe()
        .then(( response ) => {
          if(response.regional_access_limit == '1') {
            setAllowedAdditionalRegions(false);
          }
        })
        .catch(( error ) => {});
    }

    const loadJobPreference = () => {
        getJobPreference()
        .then(( response ) => {
          if(response !== null && response !== undefined) {

            var regions = [];
            var medicRoles = [];
            var medicRolesRatePerHour = [];

            // They are returned in order of ranking.
            for (index = 0; index < response.regions.length; ++index) {
              if(index == 0) {
                var primary_region_id = response.regions[index].id;
              } else {
                regions.push(response.regions[index].id);
              }
            }

            // They are returned in order of ranking.
            for (index = 0; index < response.medic_roles.length; ++index) {
              if(index == 0) {
                var primary_medic_role_id = response.medic_roles[index].id;
                var primary_medic_role_rate_per_hour = (formatPrice(response.medic_roles[index].rate_per_hour / 100)).toString();
              } else {
                medicRoles.push(response.medic_roles[index].id);
                medicRolesRatePerHour[response.medic_roles[index].id] = (formatPrice(response.medic_roles[index].rate_per_hour / 100)).toString();
              }
            }

            setFormValues({
              hours_required: response.hours_required.toString(),
              primary_medic_role_id: primary_medic_role_id,
              primary_medic_role_rate_per_hour: primary_medic_role_rate_per_hour,
              primary_region_id: primary_region_id,
            });

            setAdditionalRegions(regions);
            setAdditionalMedicRoles(medicRoles);
            setAdditionalMedicRolesRatePerHour(medicRolesRatePerHour);
          }
        })
        .catch(( error ) => {});
    }

    const setFormValue = (name, value) => {
        if (name == 'hours_required') {
            value = validateInteger(value);
        } else if (name == 'primary_medic_role_rate_per_hour') {
            value = value.substr(1); // Remove £
            value = validatePrice(value);
        }

        setFormValues({
          ...form,
          [name]: value
        });
    };

    const setPrimaryMedicRoleId = (value) => {
        setFormValues({
          ...form,
          ['primary_medic_role_id']: value[0]
        });
    }

    const setPrimaryRegionId = (value) => {
        setFormValues({
          ...form,
          ['primary_region_id']: value[0]
        });
    }

    const setAdditionalMedicRoleRatePerHour = (medic_role_id, value) => {
        value = value.substr(1); // Remove £
        value = validatePrice(value);

        let newArray = [...additionalMedicRolesRatePerHour];
        newArray[medic_role_id] = value;
        setAdditionalMedicRolesRatePerHour(newArray);
    }

    const getMedicRoleValue = (medic_role_id, key) => {
        for (index = 0; index < available_medic_roles.length; ++index) {
            if(available_medic_roles[index].id == medic_role_id) {
                return available_medic_roles[index][key];
            }
        }
    }

    const nextPage = () => {

        if(page == 1) {
            var validation = validatePage1();
        } else if(page == 2) {
            var validation = validatePage2();
        } else if(page == 3) {
            var validation = validatePage3();
        } else if(page == 4) {
            var validation = validatePage4();
        } else if(page == 5) {
            var validation = validatePage5();
        } else if(page == 6) {
            var validation = validatePage5();
        }

        if(validation === true) {
            if(page == 6) {
                submit();
            } else {
                let nextPage = page + 1;
                setPage(nextPage);
                updateTopText(nextPage);
            }
        }
    }

    const backPage = () => {
        let nextPage = page - 1;
        setPage(nextPage);
        updateTopText(nextPage);
    }

    const updateTopText = (nextPage) => {
        if (nextPage == 1) {
            setTopText("Please select your Primary Region and then click Next ...");
        } else if (nextPage == 2) {
            setTopText("Please select your Primary Role and then click Next ...");
        } else if (nextPage == 3) {
            setTopText("Please select Additional Regions you would consider working in and then click Next ...");
        } else if (nextPage == 4) {
            setTopText("Please select Additional Roles you would consider working in and then click Next ...");
        } else if (nextPage == 5) {
            setTopText("Please input your desired rates and then click Next, the average rates per hour are listed below each role ...");
        } else if (nextPage == 6) {
            setTopText("Please input the hours you require and then click Save when you are done ...");
        }
    }

    const validatePage1 = () => {
        if(form.primary_region_id == '') {
            Alert.alert( 'Please Select A Primary Region.' );
            return false;
        }

        return true;
    }

    const validatePage2 = () => {
        if(form.primary_medic_role_id == '') {
            Alert.alert( 'Please Select A Primary Role.' );
            return false;
        }

        return true;
    }

    const validatePage3 = () => {
        for (index = 0; index < additionalRegions.length; ++index) {
            let region_id = additionalRegions[index];

            if(region_id == form.primary_region_id) {
                Alert.alert( 'You have already selected one of these Regions as your Primary Region.' );
                return false;
            }
        }

        return true;
    }

    const validatePage4 = () => {
        for (index = 0; index < additionalMedicRoles.length; ++index) {
            let medic_role_id = additionalMedicRoles[index];

            if(medic_role_id == form.primary_medic_role_id) {
                Alert.alert( 'You have already selected one of these Roles as your Primary Role.' );
                return false;
            }
        }

        return true;
    }

    const validatePage5 = () => {
        let rate_per_hour = form.primary_medic_role_rate_per_hour;

        if(rate_per_hour == '' || rate_per_hour == '0.00') {
            Alert.alert( 'Please Enter A Rate Per Hour.' );
            return false;
        }

        for (index = 0; index < additionalMedicRoles.length; ++index) {
            let medic_role_id = additionalMedicRoles[index];

            if(additionalMedicRolesRatePerHour[medic_role_id] === undefined) {
                Alert.alert( 'Please Enter A Rate Per Hour For Every Role.' );
                return false;
            }

            let rate_per_hour = additionalMedicRolesRatePerHour[medic_role_id];

            if (rate_per_hour == '' || rate_per_hour == '0.00') {
                Alert.alert( 'Please Enter A Rate Per Hour For Every Role.' );
                return false;
            }
        }

        return true;
    }

    const validatePage6 = () => {
        if(form.hours_required == '' || form.hours_required == '0') {
            Alert.alert( 'Please Enter A Value For Hours Required.' );
            return false;
        }

        return true;
    }

    const submit = () => {

        // Collect the regions
        let regions = [{
            region_id: form.primary_region_id,
            ranking: 1,
        }];

        if(allowedAdditionalRegions === true) {
            for (index = 0; index < additionalRegions.length; ++index) {
                regions.push({
                    region_id: additionalRegions[index],
                    ranking: index + 2,
                });
            }
        }

        // Collect the medic roles
        let medic_roles = [{
            medic_role_id: form.primary_medic_role_id,
            ranking: 1,
            rate_per_hour: form.primary_medic_role_rate_per_hour * 100,
        }];

        if(allowedAdditionalMedicRoles === true) {
            for (index = 0; index < additionalMedicRoles.length; ++index) {
                medic_roles.push({
                    medic_role_id: additionalMedicRoles[index],
                    ranking: index + 2,
                    rate_per_hour: additionalMedicRolesRatePerHour[additionalMedicRoles[index]] * 100,
                });
            }
        }

        // Submit
        let data = {
            hours_required: form.hours_required,
            regions: regions,
            medic_roles: medic_roles,
        };

        updateJobPreference(data)
        .then(( response ) => {
            navigation.navigate('Dashboard')
        })
        .catch(( error ) => {
            setFormErrors(error.response.data.errors);
        });
    }

    return (
        <View style={screenStyles.wrapper}>
            <ScreenHeader
                height={null}
                bottomBorder={true}
                backgroundImage={null}
                title={"Job Preferences"}
                rightContent={
                    <Text style={styles.screenHeaderPage}>{page}/6</Text>
                }
            />

            <View style={screenStyles.main}>
                <View style={styles.wrapper2}>
                    <ScrollView style={styles.wrapper3}>
                        <FormErrors formErrors={formErrors} />

                        <View style={styles.topTextContainer}>
                            <Text style={styles.topText}>{topText}</Text>
                        </View>

                        { page == 1 &&
                            <>
                                <View style={styles.regionsContainer}>
                                    <MultiSelect
                                      items={available_regions}
                                      onSelectedItemsChange={setPrimaryRegionId}
                                      selectedItems={[form.primary_region_id]}
                                      selectText="Click here to select a region ..."
                                      searchInputPlaceholderText="Search Regions ..."
                                      uniqueKey="id"
                                      displayKey="name"
                                      single={true}
                                    />

                                    <Image source={regionMap} style={styles.regionsImage} />
                                </View>
                            </>
                        }

                        { page == 2 &&
                            <>
                                <View style={styles.regionsContainer}>
                                    <MultiSelect
                                      items={available_medic_roles}
                                      onSelectedItemsChange={setPrimaryMedicRoleId}
                                      selectedItems={[form.primary_medic_role_id]}
                                      selectText="Click here to select a role ..."
                                      searchInputPlaceholderText="Search Roles ..."
                                      uniqueKey="id"
                                      displayKey="name"
                                      single={true}
                                    />
                                </View>
                            </>
                        }

                        { page == 3 &&
                            <>
                                { allowedAdditionalRegions === true &&
                                    <View style={styles.regionsContainer}>
                                        <MultiSelect
                                          items={available_regions}
                                          onSelectedItemsChange={setAdditionalRegions}
                                          selectedItems={additionalRegions}
                                          selectText="Click here to select a region ..."
                                          searchInputPlaceholderText="Search Regions ..."
                                          uniqueKey="id"
                                          displayKey="name"
                                          searchInputStyle={{ paddingTop:10, paddingBottom:10, margin:5 }}
                                        />

                                        <Image source={regionMap} style={styles.regionsImage} />
                                    </View>
                                }

                                { allowedAdditionalRegions === false &&
                                    <View style={styles.upgradeContainer}>
                                      <Text style={styles.upgradeText}>
                                        You must upgrade your subscription to access multiple regions. Please click Next to go to the next page.
                                      </Text>
                                    </View>
                                }
                            </>
                        }

                        { page == 4 &&
                            <>
                                { allowedAdditionalMedicRoles === true &&
                                    <View style={styles.regionsContainer}>
                                        <MultiSelect
                                          items={available_medic_roles}
                                          onSelectedItemsChange={setAdditionalMedicRoles}
                                          selectedItems={additionalMedicRoles}
                                          selectText="Click here to select a role ..."
                                          searchInputPlaceholderText="Search Roles ..."
                                          uniqueKey="id"
                                          displayKey="name"
                                        />
                                    </View>
                                }

                                { allowedAdditionalMedicRoles === false &&
                                    <View style={styles.upgradeContainer}>
                                      <Text style={styles.upgradeText}>
                                        You must upgrade your subscription to access multiple roles. Please click Next to go to the next page.
                                      </Text>
                                    </View>
                                }
                            </>
                        }

                        { page == 5 &&
                            <>
                              <View style={styles.medicRoleTable}>
                                  <View style={styles.medicRoleRow}>
                                      <View style={styles.medicRoleCell1}>
                                          <Text style={styles.medicRoleName}>
                                            {getMedicRoleValue(form.primary_medic_role_id, 'name')}{'\n'}({getMedicRoleValue(form.primary_medic_role_id, 'rate_per_hour')})
                                          </Text>
                                      </View>
                                      <View style={styles.medicRoleCell2}>
                                          <TextInput
                                            placeholder="£0.00"
                                            style={styles.medicRoleTextInput}
                                            value={"£" + form.primary_medic_role_rate_per_hour}
                                            keyboardType="decimal-pad"
                                            onChangeText={text => setFormValue('primary_medic_role_rate_per_hour', text)}
                                          />
                                      </View>
                                  </View>

                                  {additionalMedicRoles.map((medic_role_id, i) => {
                                    return (
                                      <View style={styles.medicRoleRow} key={i}>
                                          <View style={styles.medicRoleCell1}>
                                              <Text style={styles.medicRoleName}>
                                                {getMedicRoleValue(medic_role_id, 'name')}{'\n'}({getMedicRoleValue(medic_role_id, 'rate_per_hour')})
                                              </Text>
                                          </View>
                                          <View style={styles.medicRoleCell2}>
                                              <TextInput
                                                placeholder="£0.00"
                                                style={styles.medicRoleTextInput}
                                                value={(additionalMedicRolesRatePerHour[medic_role_id] === undefined) ? "" : "£" + additionalMedicRolesRatePerHour[medic_role_id]}
                                                keyboardType="decimal-pad"
                                                onChangeText={text => setAdditionalMedicRoleRatePerHour(medic_role_id, text)}
                                              />
                                          </View>
                                      </View>
                                    )
                                  })}
                              </View>
                            </>
                        }

                        { page == 6 &&
                            <>
                                <View style={formStyles.formInput}>
                                    <TextInput
                                      style={formStyles.textInput}
                                      placeholder="Hours Required"
                                      value={form.hours_required}
                                      onChangeText={text => setFormValue('hours_required', text)}
                                    />
                                </View>
                            </>
                        }
                    </ScrollView>

                    <FormPaginator
                        totalPages="6"
                        currentPage={page}
                        submitButtonText="Save"
                        backCallback={backPage}
                        nextCallback={nextPage}
                    />
                </View>
            </View>
        </View>
    );
}

export default JobPreferenceUpdateScreen;
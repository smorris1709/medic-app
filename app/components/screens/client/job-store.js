import * as React from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import moment from "moment";
import {storeJob, getJob, updateJob} from '../../../services/client/jobs';
import {getRegions, getMedicRoles} from '../../../services/misc/regions-and-medic-roles';
import {formatPrice, validatePrice, validateInteger, reverseDate, parseTime} from '../../global/helpers';
import styles from '../../../assets/styles/client/jobStoreStyles'
import formStyles from '../../../assets/styles/form-styles'
import screenStyles from '../../../assets/styles/layout/screen-styles'
import * as Images from '../../../assets/images';
import ScreenHeader from '../../global/screen-header'
import FormPaginator from '../../global/form-paginator'
import FormErrors from '../../global/form-errors'

const {regionMap} = Images

function JobStoreScreen({ route, navigation }) {

    const {job_id} = route.params;

    const [page, setPage] = React.useState(1);
    const [topText, setTopText] = React.useState('');
    const [form, setFormValues] = React.useState({
        title: '',
        description: ''
    });
    const [dates, setDates] = React.useState([{
        date: '',
        start_time: '',
        end_time: '',
    }]);
    const [medic_roles, setMedicRoles] = React.useState([]);
    const [available_regions, setAvailableRegions] = React.useState([]);
    const [region_ids, setRegionIds] = React.useState([]);
    const [formErrors, setFormErrors] = React.useState([]);
    const [dateTimePicker, setDateTimePicker] = React.useState({
        show: false,
        mode: '',
        index: '',
        name: '',
        value: '',
    });

    useFocusEffect(
        React.useCallback(() => {
            loadRegions();
            loadMedicRoles();
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
            let medic_roles = [];

            for (index = 0; index < response.length; ++index) {
                medic_roles[index] = {
                    medic_role_id: response[index].id,
                    medic_role_name: response[index].name,
                    recommended_rate_per_hour: response[index].rate_per_hour,
                    number_required: '',
                    rate_per_hour: '0.00',
                };
            }

            setMedicRoles(medic_roles);

            // Once all medic_roles are set then load the existing job data.
            loadJob(medic_roles);
        })
        .catch(( error ) => {});
    }

    const loadJob = (medic_roles) => {
        if(job_id !== null) {
            getJob(job_id)
            .then(( response ) => {
                // form values
                setFormValues({
                    title: response.title,
                    description: response.description
                });

                // dates
                for (index = 0; index < response.dates.length; ++index) {
                    response.dates[index].start_time = parseTime(response.dates[index].start_time);
                    response.dates[index].end_time = parseTime(response.dates[index].end_time);
                }
                setDates(response.dates);

                // medic_roles
                for (index1 = 0; index1 < response.medic_roles.length; ++index1) {
                    for (index2 = 0; index2 < medic_roles.length; ++index2) {
                        if(response.medic_roles[index1].id == medic_roles[index2].medic_role_id) {
                            medic_roles[index2].number_required = response.medic_roles[index1].number_required.toString();
                            medic_roles[index2].rate_per_hour = (formatPrice(response.medic_roles[index1].rate_per_hour / 100)).toString();
                        }
                    }
                }
                setMedicRoles(medic_roles);

                // region_ids
                let region_ids = [];
                for (index = 0; index < response.regions.length; ++index) {
                    region_ids.push(response.regions[index].id);
                }
                setRegionIds(region_ids);
            })
            .catch(( error ) => {});
        }
    };

    const setFormValue = (name, value) => {
        setFormValues({
          ...form,
          [name]: value
        });
    };

    const setMedicRole = (index, name, value) => {
        if (name == 'number_required') {
            value = validateInteger(value);
        } else if (name == 'rate_per_hour') {
            value = value.substr(1); // Remove £
            value = validatePrice(value);
        }

        let newMedicRoles = [...medic_roles];
        newMedicRoles[index][name] = value;
        setMedicRoles(newMedicRoles);
    };

    const addDate = () => {
        setDates([...dates, {
            date: '',
            start_time: '',
            end_time: '',
        }]);
    }

    const removeDate = (index) => {
        let newDates = [...dates];
        newDates.splice(index, 1);
        setDates(newDates);
    }

    const resetDates = () => {
        setDates([{
            date: '',
            start_time: '',
            end_time: '',
        }]);
    }

    const showDateTimePicker = (index, name) => {
        if(name == 'date') {
            var mode = 'date';
        } else {
            var mode = 'time';
        }

        let current_value = dates[index].name;

        if(current_value == '') {
            var new_value = new Date();
        } else {
            var new_value = new Date(); // TODO swap to current_value as a date object
        }

        setDateTimePicker({
            mode: mode,
            show: true,
            index: index,
            name: name,
            value: new_value
        });
    };

    const onChangeDateTimePicker = (event, selectedDate) => {
        setDateTimePicker({
          ...dateTimePicker,
          ['value']: selectedDate
        });
    };

    const submitDateTimePicker = () => {

        // Get values
        if(dateTimePicker.name == 'date') {
            var value = moment(dateTimePicker.value).format('YYYY-MM-DD');
        } else {
            var value = moment(dateTimePicker.value).format('HH:mm');
        }

        // Update state
        let newDates = [...dates];
        newDates[dateTimePicker.index][dateTimePicker.name] = value;
        setDates(newDates);

        // Hide the DateTimePicker
        setDateTimePicker({
            show: false,
            mode: '',
            index: '',
            name: '',
            value: ''
        });
    };

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
        }

        if(validation === true) {
            if(page == 5) {
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
            setTopText("Please provide a title for the Job you are offering ...");
        } else if (nextPage == 2) {
            setTopText("Please enter Dates for the Job by clicking on the green text below, to add multiple dates click on the Add Another Day button ...");
        } else if (nextPage == 3) {
            setTopText("Select a Region ...");
        } else if (nextPage == 4) {
            setTopText("Select Job Roles, the average rates per hour are listed below each role ...");
        } else if (nextPage == 5 && job_id === null) {
            setTopText("Once you have provided further Job Information please click Post Job ...");
        } else if (nextPage == 5 && job_id !== null) {
            setTopText("Once you have provided further Job Information please click Update Job ...");
        }
    }

    const validatePage1 = () => {
        if(form.title == '') {
            Alert.alert( 'Please enter a job title.' );
            return false;
        }

        return true;
    }

    const validatePage2 = () => {
        if (dates.length == 0) {
            Alert.alert( 'Please enter at least one date.' );
            return false;
        }

        for (index = 0; index < dates.length; ++index) {
            if (dates[index].date == '' || dates[index].start_time == '' || dates[index].end_time == '') {
                Alert.alert( 'Please select a date, start time and end time for all dates.' );
                return false;
            }

            // TODO need to do this via moment or JS
            if(dates[index].start_time >= dates[index].end_time) {
                Alert.alert( 'End times must be after start times.' );
                return false;
            }
        }

        // TODO validate no duplicate dates

        return true;
    }

    const validatePage3 = () => {
        if (region_ids.length == 0) {
            Alert.alert( 'Please select a region.' );
            return false;
        }

        return true;
    }

    const validatePage4 = () => {
        let empty = true;

        for (index = 0; index < medic_roles.length; ++index) {
            if (medic_roles[index].number_required > 0) {

                let rate_per_hour = medic_roles[index].rate_per_hour;

                if (rate_per_hour == '' || rate_per_hour == '0.00') {
                    Alert.alert( 'Please enter a Rate Per Hour for all selected job roles.' );
                    return false;
                }

                empty = false;
            }
        }

        if (empty === true) {
            Alert.alert( 'Please select a job role.' );
            return false;
        }

        return true;
    }

    const validatePage5 = () => {        
        if(form.description == '') {
            Alert.alert( 'Please enter a job description.' );
            return false;
        }

        return true;
    }

    const submit = () => {

        // Only submit dates with number_required != 0
        let medicRolesToSubmit = [];
        for (index = 0; index < medic_roles.length; ++index) {
            if (medic_roles[index].number_required > 0) {
                // Copy without reference.
                const medicRole = JSON.parse(JSON.stringify(medic_roles[index])); 
                medicRole.rate_per_hour = medicRole.rate_per_hour * 100;
                medicRolesToSubmit.push(medicRole);
            }
        }

        // Submit
        let data = {
            title: form.title,
            description: form.description,
            region_ids: region_ids,
            medic_roles: medicRolesToSubmit,
            dates: dates,
        };

        if(job_id === null)
        {
            storeJob(data)
            .then(( response ) => {
                navigation.navigate('Job', { job_id: response.id})
            })
            .catch(( error ) => {
                setFormErrors(error.response.data.errors);
            });
        } else {
            updateJob(job_id, data)
            .then(( response ) => {
                navigation.navigate('Job', { job_id: job_id})
            })
            .catch(( error ) => {
                setFormErrors(error.response.data.errors);
            });
        }
    }

    return (
        <View style={screenStyles.wrapper}>
            <ScreenHeader
                bottomBorder={true}
                title={"Post New Job"}
                rightContent={
                  <Text style={styles.screenHeaderPage}>{page}/5</Text>
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
                                <View style={formStyles.formInput}>
                                    <TextInput
                                      style={formStyles.textInput}
                                      placeholder="Job Title"
                                      value={form.title}
                                      onChangeText={text => setFormValue('title', text)}
                                    />
                                </View>
                            </>
                        }

                        { page == 2 &&
                            <>
                                <View style={styles.dateTable}>
                                    {dates.map((date, i) => {
                                      return (
                                        <View style={styles.dateRow} key={i}>

                                            <Text style={styles.dateText}>Day {i+1}) </Text>

                                            <TouchableOpacity
                                              onPress={() => showDateTimePicker(i, 'start_time')}>
                                                { date.start_time === '' &&
                                                    <Text style={styles.dateGreenText}>(Start Time)</Text>
                                                }
                                                { date.start_time !== '' &&
                                                    <Text style={styles.dateText}>{date.start_time}</Text>
                                                }
                                            </TouchableOpacity>

                                            <Text style={styles.dateText}> to </Text>

                                            <TouchableOpacity
                                              onPress={() => showDateTimePicker(i, 'end_time')}>
                                                { date.end_time === '' &&
                                                    <Text style={styles.dateGreenText}>(End Time)</Text>
                                                }
                                                { date.end_time !== '' &&
                                                    <Text style={styles.dateText}>{date.end_time}</Text>
                                                }
                                            </TouchableOpacity>

                                            <Text style={styles.dateText}> on </Text>

                                            <TouchableOpacity
                                              onPress={() => showDateTimePicker(i, 'date')}>
                                                { date.date === '' &&
                                                    <Text style={styles.dateGreenText}>(Date)</Text>
                                                }
                                                { date.date !== '' &&
                                                    <Text style={styles.dateText}>{reverseDate(date.date)}</Text>
                                                }
                                            </TouchableOpacity>

                                            {/*
                                            <TouchableOpacity
                                              onPress={() => removeDate(i)}>
                                              <Text style={styles.dateText}> (Remove) </Text>
                                            </TouchableOpacity>
                                            */}
                                        </View>
                                      )
                                    })}

                                    <TouchableOpacity
                                      style={styles.addDateButton}
                                      onPress={() => addDate()}>
                                      <Text style={styles.dateButtonText}>Add Another Day</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                      style={styles.addDateButton}
                                      onPress={() => resetDates()}>
                                      <Text style={styles.dateButtonText}>Reset Dates</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        }

                        { page == 3 &&
                            <>
                                <View style={styles.regionsContainer}>
                                    <MultiSelect
                                      items={available_regions}
                                      onSelectedItemsChange={setRegionIds}
                                      selectedItems={region_ids}
                                      selectText="Click here to select a region ..."
                                      searchInputPlaceholderText="Search Regions ..."
                                      uniqueKey="id"
                                      displayKey="name"
                                    />

                                    <Image source={regionMap} style={styles.regionsImage} />
                                </View>
                            </>
                        }

                        { page == 4 &&
                            <>
                                <View style={styles.medicRoleTable}>
                                    <View style={styles.medicRoleRow}>
                                        <View style={styles.medicRoleCell1}>
                                            <Text style={styles.medicRoleColumnHeader}></Text>
                                        </View>
                                        <View style={styles.medicRoleCell2}>
                                            <Text style={styles.medicRoleColumnHeader}>Number Required</Text>
                                        </View>
                                        <View style={styles.medicRoleCell2}>
                                            <Text style={styles.medicRoleColumnHeader}>Rate Per Hour (£)</Text>
                                        </View>
                                    </View>

                                    {medic_roles.map((medic_role, i) => {
                                      return (
                                        <View style={styles.medicRoleRow} key={i}>
                                            <View style={styles.medicRoleCell1}>
                                                <Text style={styles.medicRoleName}>{medic_role.medic_role_name}{'\n'}({medic_role.recommended_rate_per_hour})</Text>
                                            </View>
                                            <View style={styles.medicRoleCell2}>
                                                <TextInput
                                                  placeholder="0"
                                                  style={styles.medicRoleTextInput}
                                                  value={medic_role.number_required}
                                                  keyboardType="number-pad"
                                                  onChangeText={text => setMedicRole(i, 'number_required', text)}
                                                />
                                            </View>
                                            <View style={styles.medicRoleCell2}>
                                                <TextInput
                                                  placeholder="£0.00"
                                                  style={styles.medicRoleTextInput}
                                                  value={"£" + medic_role.rate_per_hour}
                                                  keyboardType="decimal-pad"
                                                  onChangeText={text => setMedicRole(i, 'rate_per_hour', text)}
                                                />
                                            </View>
                                        </View>
                                      )
                                    })}
                                </View>
                            </>
                        }

                        { page == 5 &&
                            <>
                                <View style={formStyles.formInput}>
                                    <TextInput
                                      style={formStyles.textAreaInput}
                                      placeholder="Further Job Information ..."
                                      value={form.description}
                                      onChangeText={text => setFormValue('description', text)}
                                      multiline = {true}
                                      numberOfLines = {20}
                                    />
                                </View>
                            </>
                        }

                        {dateTimePicker.show && (
                            <Modal isVisible={true} backdropColor={'#333333'}>
                                <View style={styles.dateTimePickerContainer}>
                                    <DateTimePicker
                                      value={dateTimePicker.value}
                                      mode={dateTimePicker.mode}
                                      is24Hour={true}
                                      display="default"
                                      onChange={onChangeDateTimePicker}
                                    />

                                    <View style={styles.dateTimePickerContainer2}>
                                        <TouchableOpacity
                                            onPress={() => submitDateTimePicker()}
                                            style={formStyles.button}>
                                            <Text style={formStyles.buttonText}>Select</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        )}
                    </ScrollView>

                    <FormPaginator
                        totalPages="5"
                        currentPage={page}
                        submitButtonText={ job_id === null  ? 'Post Job' : 'Update Job'}
                        backCallback={backPage}
                        nextCallback={nextPage}
                    />
                </View>
            </View>
        </View>
    );
}

export default JobStoreScreen;

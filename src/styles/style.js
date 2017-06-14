import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#43a047'
    },
    tabBar: {
        backgroundColor: '#72bb53'
    },
    tabIndicator: {
        backgroundColor: '#fe4a49'
    },
    headerLeftIcon: {
        color: 'white',
        fontSize: 24,
        marginLeft: 16
    },
    newButton: {
        fontSize: 20,
        color: 'white'
    },
    pageContent: {
        flex: 1,
        backgroundColor: '#f7f6f6'
    },
    loginInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        margin: 10
    },
    activityItem: {
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 5
    },
    itemHeader: {
        fontSize: 16,
        color: 'black'
    },
    itemDateTime: {
        fontSize: 10
    },
    dateHeading: {
        fontSize: 16
    },
    table: {
        margin: 10,
        backgroundColor: 'white'
    },
    rowText: {
        fontSize: 14,
        margin: 5
    },
    button: {
        marginHorizontal: 10
    },
    errorMessage: {
        color: 'red',
        fontSize: 11
    },
    label: {
        color: '#fe4a49',
        fontSize: 11
    },
    margin: {
        margin: 10
    }
});

export default styles;
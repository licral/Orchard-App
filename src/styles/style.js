import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#43a047'
    },
    tabBar: {
        backgroundColor: 'white'
    },
    tabIndicator: {
        backgroundColor: '#43a047'
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
    dateHeadingView: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
    dateHeadingText: {
        fontSize: 16
    },
    table: {
        margin: 10,
        backgroundColor: 'white'
    },
    rowText: {
        fontSize: 14,
        margin: 5
    }
});

export default styles;
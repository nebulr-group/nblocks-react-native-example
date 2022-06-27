import {StyleSheet} from 'react-native';

const primaryColor = "rgb(31, 66, 221)";
const secondaryColor = "rgb(61, 194, 255)";
const dangerColor = "rgb(235, 68, 90)";
const cancelColor = "lightgray";
const defaultPadding = 15;
const textColor = 'black';

const brandingConfig = StyleSheet.create({
    body: {
        
    },
    textGlobal: {
        color: textColor
    },
    defaultPadding: {
        padding: defaultPadding
    },
    title: {
        fontSize: 28,
        marginTop: 5,
        marginBottom: 10
    },
    subTitle: {
        fontSize: 20,
        marginTop: 5,
        marginBottom: 8
    },
    textIngress: {
        fontSize: 16,
        marginBottom: 5
    },
    button: {
        marginTop: 5,
        alignItems: 'center',
        borderRadius:4
    },
    buttonText: {
        color: 'white',
        padding: 10,
        fontWeight: "700",
    },
  });

export {brandingConfig, primaryColor, secondaryColor, dangerColor, cancelColor};
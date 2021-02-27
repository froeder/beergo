import * as Amplitude from 'expo-analytics-amplitude';


export async function logEvent(props: Props) {

    await Amplitude.initialize("93bd83e262e8ddfb032cccd937e40595");
    if (props.params) {
        await Amplitude.logEventWithProperties(props.eventName, props.params)
    } else {
        await Amplitude.logEvent(props.eventName)
    }
}

type Props = {
    eventName: string,
    params?: object
}
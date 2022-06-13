import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";
import { Timing } from "./Timing";

const ONE_SECOND_IN_MS = 1000;

const VIBRATION_PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
]

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
    useKeepAwake();
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);
    const [minutes, setMinutes] = useState(0.05);

    const onEnd = (reset) => {
        Vibration.vibrate(VIBRATION_PATTERN)
        setProgress(1);
        reset();
        setIsStarted(false);
        onTimerEnd(focusSubject);
    }

    return(
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown 
                    minutes={minutes} 
                    isPaused={!isStarted} 
                    onProgress={(progress) => {setProgress(progress)}} 
                    onEnd={onEnd}
                />
                <View style={{marginTop: spacing.xxxl }}>
                    <Text style={styles.title}>Focusing on:</Text>
                    <Text style={styles.task}>{focusSubject}</Text>
                </View>
            </View>
            <View style={{paddingTop: spacing.sm }}>
                <ProgressBar progress={progress} color={colors.barColor} style={{ height: spacing.md }}/>
            </View>
            <View style={styles.timingWrapper}>
                <Timing onChangeTime={setMinutes}/>
            </View>
            <View style={styles.buttonWrapper}>
                {!isStarted && (<RoundedButton title="start" onPress={() => setIsStarted(true)}></RoundedButton>)}
                {isStarted && (<RoundedButton title="pause" onPress={() => setIsStarted(false)}></RoundedButton>)}
            </View>
            <View style={styles.clearSubjectWrapper}>
                <RoundedButton size={50} title="<" onPress={clearSubject}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },

    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    timingWrapper: {
        flex: 0.1,
        flexDirection: 'row',
        paddingTop: spacing.xxl,
    },

    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    clearSubjectWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    title: {
        fontSize: fontSizes.lg,
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    task: {
        fontSize: fontSizes.lg,
        color: colors.white,
        textAlign: 'center',
    },
});
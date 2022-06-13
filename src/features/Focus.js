import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';

export const Focus = ( props ) => {
    const [subject, setSubject] = useState(null);
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput label="What would you like to focus on?" 
                    onChangeText={setSubject} 
                    style={styles.TextInput}
                    activeUnderlineColor={colors.barColor}
                />
                <View style={styles.buttonContainer}>
                    <RoundedButton title="+" size={50} onPress={() => props.addSubject(subject)}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    buttonContainer: {
        justifyContent: 'center',
    },
    inputContainer: {
        paddingTop: 100,
        padding: spacing.lg,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    TextInput: {
        flex: 1,
        marginRight: spacing.sm,
    },
});
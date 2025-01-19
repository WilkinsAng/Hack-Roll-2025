import React from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamsList} from "@/app";
import {View} from "react-native";


const handleAddTrips = () => {

}
type AddTripFormNavigationProps = StackNavigationProp<RootStackParamsList, "AddTrip">;

const AddTripForm = () => {
    const navigation = useNavigation<AddTripFormNavigationProps>();
    return (
        <View>

        </View>
    );
}

export default AddTripForm
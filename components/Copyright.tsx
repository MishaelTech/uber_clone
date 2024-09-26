import { Text, View } from "react-native";

const Copyright = () => {
    return (
        <View className="flex items-center justify-center my-5">
            <Text className="font-JakartaSemiBold text-sm text-gray-500">
                © {new Date().getFullYear()} MizSpace Technology. All rights reserved.
            </Text>
        </View>
    );
}

export default Copyright;

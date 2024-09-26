import { icons } from "@/constants";
import { router } from "expo-router";
import { Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useRef } from "react";

const RideLayout = ({
    title,
    children,
    snapPoints,
}: {
    title: string;
    children: React.ReactNode;
    snapPoints?: string[];
}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleChildPress = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.snapToIndex(1); // Snap to 80%
        }
    };

    return (
        <GestureHandlerRootView>
            <View className="flex-1 bg-white">
                <View className="flex flex-col h-screen bg-green-500">
                    <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                                <Image
                                    source={icons.backArrow}
                                    resizeMode="contain"
                                    className="w-6 h-6"
                                />
                            </View>
                        </TouchableOpacity>

                        <Text className="text-xl font-JakartaSemiBold ml-5">
                            {title || "Go Back"}
                        </Text>
                    </View>

                    <Map />

                </View>

                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints || ["50%", "80%"]}
                    index={0}
                //keyboardBehavior="extend"
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <BottomSheetView style={{ flex: 1, padding: 20 }}>
                            {children}
                        </BottomSheetView>
                    </TouchableWithoutFeedback>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
}

export default RideLayout;

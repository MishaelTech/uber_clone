import Copyright from "@/components/Copyright";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    const { user } = useUser();
    const profileImage = user?.unsafeMetadata?.imageUrl;

    return (
        <SafeAreaView>
            <ScrollView
                className="px-5"
                contentContainerStyle={{ paddingBottom: 90 }}
            >
                <Text className="text-2xl font-JakartaBold my-5">
                    Your Profile
                </Text>

                <View className="items-center justify-center flex my-5">
                    <Image
                        source={{ uri: profileImage as string || user?.externalAccounts[0]?.imageUrl || user?.imageUrl }}
                        style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
                        className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
                        resizeMode="contain"
                    />

                    <Text className="font-JakartaSemiBold text-2xl my-3">{user?.fullName || "Not Found"}</Text>
                </View>

                <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
                    <View className="flex flex-col items-start justify-start w-full">
                        {/* <InputField
                            label="First name"
                            placeholder={user?.firstName || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            editable={false}
                            icon={icons.profile}
                        />

                        <InputField
                            label="Last name"
                            placeholder={user?.lastName || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            editable={false}
                            icon={icons.profile}
                        /> */}

                        <InputField
                            label="Email"
                            placeholder={
                                user?.emailAddresses[0].emailAddress || user?.primaryEmailAddress?.emailAddress || "Not Found"
                            }
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            editable={false}
                            icon={icons.email}
                        />

                        <View className="flex w-full mb-4">
                            <Text className="text-lg font-JakartaSemiBold mb-3 ">Email Verified</Text>
                            <View
                                className={`p-4 rounded-xl ${user?.primaryEmailAddress?.verification?.status === "verified" ? "bg-[#d1fae5] border-r-8 border-r-green-800" : "bg-[#fee2e2] border-r-8 border-r-red-800"}`}
                            >
                                <Text
                                    className={`rounded-full pl-3 font-JakartaSemiBold text-[17px] text-left ${user?.primaryEmailAddress?.verification?.status === "verified" ? "#065f46" : "#b91c1c"}`}
                                >
                                    <Image
                                        source={icons.checkmark}
                                        className="w-4 h-4"
                                        tintColor="black"
                                        resizeMode="contain"
                                    />
                                    {user?.primaryEmailAddress?.verification?.status === "verified"
                                        ? "Verified"
                                        : "Not Verified"}
                                </Text>
                            </View>
                        </View>


                        <InputField
                            label="Phone"
                            placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            editable={false}
                            icon={icons.chat}
                        />
                    </View>
                </View>

            </ScrollView>

            <Copyright />
        </SafeAreaView>
    )
}

export default Profile;

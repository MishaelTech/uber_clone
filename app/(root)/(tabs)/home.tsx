import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import * as Location from "expo-location";
import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, router } from "expo-router";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

export default function Page() {
    const { setUserLocation, setDestinationLocation } = useLocationStore();
    const { user } = useUser();
    const { signOut } = useAuth();
    // Retrieve the profile image URL from the user's public metadata
    const profileImage = user?.unsafeMetadata?.imageUrl;
    //console.log(profileImageUrl);

    const { data: recentRides, loading } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

    const [hasPermissions, setHasPermissions] = useState(false);

    const handleSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    }

    const handleDestinationPress = (location: {
        latitude: number;
        longitude: number;
        address: string;
    }) => {
        setDestinationLocation(location);

        router.push("/(root)/find-ride" as Href<string>);
        //router.push("/(root)/find-ride");
    };

    // Getting location permission
    useEffect(() => {
        const requestLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status != "granted") {
                setHasPermissions(false)
                return;
            }

            let location = await Location.getCurrentPositionAsync();

            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords?.latitude!,
                longitude: location.coords?.longitude!,
            });

            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                // latitude: 37.78825,
                // longitude: -122.4324,
                address: `${address[0].name}, ${address[0].region}`
            })
        };

        requestLocation();
    }, []);



    return (
        <SafeAreaView className="bg-general-500">
            {/* <View className="flex flex-row items-center justify-between my-5 px-5">
                <Text className="text-2xl capitalize font-JakartaExtraBold ">
                    <Image
                        source={{ uri: profileImageUrl as string || user?.imageUrl }}
                        className="w-8 h-8 rounded-full mx-1"
                        resizeMode="contain"
                    />
                    Welcome, <Text className="text-green-700">{user?.firstName}👋</Text>

                    Welcome <Text className="text-green-700">{user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0]}{""}👋</Text> 
                </Text>

                <TouchableOpacity onPress={handleDestinationPress} className="justify-center items-center w-10 h-10 rounded-full bg-white">
                    <Image source={icons.out} className="w-4 h-4" />
                </TouchableOpacity>
            </View>

            <View className="px-5">
                <GoogleTextInput
                    icon={icons.search}
                    containerStyle="bg-white shadow-md shadow-newutral-300"
                    handlePress={handleDestinationPress}
                />
            </View> */}

            <FlatList
                data={recentRides?.slice(0, 5)}
                //data={[]}
                renderItem={({ item }) => <RideCard ride={item} />}
                className="px-5"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 100, }}
                ListEmptyComponent={() => (
                    <View className="flex flex-col items-center justify-center">
                        {!loading ? (
                            <>
                                <Image
                                    source={images.noResult}
                                    className="w-40 h-40"
                                    alt="No recent rides found"
                                    resizeMode="contain"
                                />
                                <Text className="text-sm">No recent rides found</Text>
                            </>
                        ) : (
                            <ActivityIndicator size="small" color="#000" />
                        )}
                    </View>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className="flex flex-row items-center justify-between my-5">
                            <Text className="text-2xl capitalize font-JakartaExtraBold ">
                                <Image
                                    source={{ uri: profileImage as string || user?.imageUrl, cache: 'force-cache' }}
                                    className="w-8 h-8 rounded-full mx-1"
                                    resizeMode="contain"
                                />
                                Welcome, <Text className="text-green-700">{user?.firstName}👋</Text>

                                {/* Welcome <Text className="text-green-700">{user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0]}{""}👋</Text> */}
                            </Text>

                            <TouchableOpacity onPress={handleDestinationPress} className="justify-center items-center w-10 h-10 rounded-full bg-white">
                                <Image source={icons.out} className="w-4 h-4" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleSignOut} className="justify-center items-center w-10 h-10 rounded-full bg-white">
                                <Image source={icons.out} className="w-4 h-4" />
                            </TouchableOpacity>
                        </View>

                        <GoogleTextInput
                            icon={icons.search}
                            containerStyle="bg-white shadow-md shadow-newutral-300"
                            handlePress={handleDestinationPress}
                        />

                        <>
                            <Text className="text-xl font-JakartaBold mt-5 mb-3">
                                Your Current Location
                            </Text>
                            <View className="flex flex-row items-center bg-transparent h-[300px]">
                                <Map />
                            </View>
                        </>

                        <Text className="text-xl font-JakartaBold mt-5 mb-3">
                            Recent Rides
                        </Text>
                    </>
                )}
            />
        </SafeAreaView>
    );
}
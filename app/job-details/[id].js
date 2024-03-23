import React from "react";
import { useState, useCallback } from "react";
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { ScreenHeaderBtn, Company, JobAbout, JobFooter, JobTabs, Specifics } from "../../components";
import useFetch from "../../hook/useFetch";
import styles from "../../components/common/header/screenheader.style";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
    const param = useGlobalSearchParams();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const { data, isLoading, error, refetch } = useFetch('job-details', { job_id: param.id });
    const [refreshing, setRefreshing] = useState(false);

    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualifications":
                return (
                <Specifics
                    title='Qualifications'
                    points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                />
                );

            case "About":
                return (
                <JobAbout info={data[0].job_description ?? "No data provided"} />
                );

            case "Responsibilities":
                return (
                <Specifics
                    title='Responsibilities'
                    points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                />
                );

            default:
                return null;
                }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, []);

    return(
        <SafeAreaView styles={{flex:1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" onPress={() => router.back()} />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
                ),
                headerTitle: ""
            }} /> 

        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitles={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
        </SafeAreaView>
    
    )
}
export default JobDetails;
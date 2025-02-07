import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import PopularjobsCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'

import styles from './popularjobs.style'

const Popularjobs = () => {

  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch('search', {query:'React developer',page: '1', num_pages: 1})

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity onPress={() => router.push('/search')}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.errorText}>Error fetching data</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => 
            <PopularjobsCard 
              item = {item} 
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
            }
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>

    </View>
  )
}

export default Popularjobs
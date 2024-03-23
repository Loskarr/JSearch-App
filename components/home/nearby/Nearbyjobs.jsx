import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import NearbyjobsCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'

import styles from './nearbyjobs.style'

const Nearbyjobs = () => {
  const { data, isLoading, error, refetch } = useFetch('search', {query:'React developer',page: '1', num_pages: 1})
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job) => <NearbyjobsCard 
            job = {job}
            key={`nearby-job-${job?.job_id}`}
            handleNavigate = {() => router.push(`/job-details/${job.job_id}`)}
            />)
        )}
      </View>

    </View>
  )
}

export default Nearbyjobs
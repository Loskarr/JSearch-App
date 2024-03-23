import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './company.style'
import { icons } from '../../../constants'
import { isImage } from '../../../utils'

const Company = ({companyLogo, jobTitles, companyName, location }) => {
  return (
    <View style ={ styles.container}>
      <View style = {styles.logoBox}>
        <Image 
          source={{uri: companyLogo }}
          resizeMode="contain" 
          style={styles.logoImage}
        />
      </View>

      <View style = {styles.jobTitleBox}>
        <Text style={styles.jobTitle} numberOfLines={1}>{jobTitles}</Text>
      </View>

      <View style = {styles.companyInfoBox}>
        <Text style={styles.companyName} numberOfLines={1}>{companyName} /</Text>
        <View style={styles.locationBox} >
          <Image 
            source={icons.location}
            resizeMode="contain" 
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  )
}

export default Company
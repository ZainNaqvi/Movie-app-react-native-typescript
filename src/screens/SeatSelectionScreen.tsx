import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SeatSelectionScreen : React.FC<any> = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState<string>('5 Oct');
  const dates = ['5 Oct', '6 Oct', '7 Oct', '8 Oct', '9 Oct'];

  return (
    <SafeAreaView style={[styles.container]}>


      <View style={styles.header}>
     <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
  <Icon name="chevron-back" size={24} />
</TouchableOpacity>


        <View style={styles.titleContainer}>
          <Text style={styles.title}>The King’s Man</Text>
          <Text style={styles.subtitle}>March 5, 2021 · 12:30 Hall 1</Text>
        </View>

        <View style={styles.backButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={{ ...styles.title, textAlign: 'left', marginBottom: verticalScale(10) }}>Dates</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateSelectorContainer}
          >
            {dates.map((date) => (
              <TouchableOpacity
                key={date}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.dateBox,
                  selectedDate === date && styles.dateBoxSelected,
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === date && styles.dateTextSelected,
                  ]}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={dates}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}

          renderItem={({ item }) => (
            <View
              style={[
                styles.dateContainer,
                { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ccc' },
                { marginRight: scale(10) },
              ]}
            >
              {/* No Text inside */}
            </View>
          )}
        />

      </ScrollView>


      <TouchableOpacity style={styles.selectSeatsButton}>
        <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SeatSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(16),
  },
  scrollContent: {
    paddingBottom: verticalScale(100),
  },
  header: {
    paddingTop: verticalScale(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  backButton: {
    width: 40,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: '#888',
    textAlign: 'center',
    marginTop: verticalScale(2),
  },

  dateSelectorContainer: {
    height: verticalScale(50),
    alignItems: 'center',
  },

  dateBox: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(14),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: scale(10),
  },
  dateBoxSelected: {
    backgroundColor: '#2e7dff',
    borderColor: '#2e7dff',
  },
  dateText: {
    fontSize: moderateScale(12),
    color: '#333',
  },
  dateTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },

  dateContainer: {
    width: scale(144),
    height: verticalScale(144),
    borderRadius: scale(24),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },

  selectSeatsButton: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(16),
    right: scale(16),
    backgroundColor: '#2e7dff',
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  selectSeatsButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
});

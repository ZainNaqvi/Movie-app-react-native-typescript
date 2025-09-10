import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface SearchComponentProps {
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  isSearching,
  setIsSearching,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <View style={styles.container}>
      {isSearching ? (
        <View style={styles.searchBox}>
          <Icon
            name="search-outline"
            size={moderateScale(20)}
            color="#666"
            style={{ marginHorizontal: scale(8) }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setIsSearching(false);
            }}
          >
            <Icon
              name="close-outline"
              size={moderateScale(24)}
              color="#666"
              style={{ marginHorizontal: scale(8) }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setIsSearching(true)}>
          <Icon name="search-outline" size={moderateScale(28)} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    padding: scale(12),
    alignItems: 'flex-end',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: scale(44),
    paddingHorizontal: scale(8),
    width: '100%',
    height: verticalScale(44),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#000',
    paddingVertical: 0,
  },
});

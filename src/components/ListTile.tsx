import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageSourcePropType,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface ListTileProps {
    imageUrl: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
}

const ListTile: React.FC<ListTileProps> = ({
    imageUrl,
    title,
    subtitle,
    onPress,
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w92${imageUrl}` } as ImageSourcePropType}
                style={styles.tileImage}
            />

            <View style={styles.tileContent}>
                <View style={styles.tileTextContainer}>
                    <Text numberOfLines={2} style={styles.tileTitle}>{title}</Text>
                    {subtitle && (
                        <Text numberOfLines={1} style={styles.tileSubtitle}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                <Icon
                  name="ellipsis-horizontal"
                    size={moderateScale(20)}
                    color="#999"
                    style={styles.trailingIcon}
                />
            </View>
        </TouchableOpacity>
    );
};

export default ListTile;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scale(10),
        width: scale(400),
    },
    tileImage: {
        width: scale(92),
        height: verticalScale(92),
        borderRadius: scale(12),
        marginRight: scale(12),
    },
    tileContent: {
        width: scale(218), 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tileTextContainer: {
        flex: 1,
        paddingRight: scale(8),
    },
    tileTitle: {
        fontSize: moderateScale(14),
        fontWeight: "bold",
        color: "#111",
        flexWrap: "wrap",
    },
    tileSubtitle: {
        fontSize: moderateScale(12),
        color: "#666",
        marginTop: 2,
    },
    trailingIcon: {
        marginLeft: scale(8),
    },
});

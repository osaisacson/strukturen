import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CachedImage from '../../components/UI/CachedImage';
import TouchableCmp from './TouchableCmp';

const SmallRoundItem = ({ navigation, detailPath, style, item, showText }) => {
  const selectItemHandler = (id, ownerId, title) => {
    navigation.navigate(detailPath, {
      detailId: id,
      ownerId,
      detailTitle: title,
    });
  };

  return (
    <View style={{ ...styles.project, ...style }}>
      <View style={styles.touchable}>
        <TouchableCmp
          onPress={() => {
            selectItemHandler(item.id, item.ownerId, item.title);
          }}
          useForeground>
          <View style={styles.imageContainer}>
            <CachedImage style={styles.image} uri={item.image} />
          </View>
        </TouchableCmp>
      </View>
      {showText ? <Text style={styles.title}>{item.title}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    textAlign: 'left',
    fontFamily: 'roboto-regular',
    fontSize: 14,
  },
  project: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchable: {
    height: 40,
    width: 40,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    borderWidth: 0.1,
    borderColor: '#000',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 100 / 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100 / 2,
  },
});

export default SmallRoundItem;

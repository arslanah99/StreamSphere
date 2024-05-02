import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Video, Audio } from 'expo-av';

const TabOneScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    configureAudioSession();
  }, []);

  // Function to configure the audio session
  const configureAudioSession = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false
      });
      console.log('Audio mode set successfully.');
    } catch (error) {
      console.log('Failed to set audio mode:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000FF" />
      ) : (
        <>
          <Video
            source={{ uri: 'https://ewal.v421c6e485f.site/_v2-wwdo/12a3c523fc105800ed8c394685aeeb0bc52efd5c5eb0f8f500407baea93ece832257df1a4b6125fcfa38c35da05dee86aad28d46d73fc4e9d4e5a63d5435a3876fc014a45a0db85f4dc2f1ab6b4622007764d83c570530969c9de809c2a57c863b48e31c/h/list;15a38634f803584ba8926411d7bee906856cab0654b5bfb3.m3u8' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay
            isLooping
            useNativeControls
            style={{ width: 300, height: 300 }}
          />
          <Text style={{ paddingTop: 20 }}>Video should be playing above if the M3U8 link is correct.</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default TabOneScreen;

// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Modal,
//   Image,
// } from 'react-native';
// import {Video} from 'expo-av';
// import {FontAwesome} from '@expo/vector-icons';
// import * as ScreenOrientation from 'expo-screen-orientation';
// import Slider from '@react-native-community/slider';

// const TabOneScreen = () => {
  // const videoRef = useRef(null);
  // const [status, setStatus] = useState({});
//   const [overlayVisible, setOverlayVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [videoProgress, setVideoProgress] = useState(0);
  // const [useNativeControls, setUseNativeControls] = useState(true);
  // useEffect(() => {
  //   return () => setUseNativeControls(false);
  // }, []);

//   const updateProgress = (status) => {
//     setStatus(() => status);
//     const progress = status.positionMillis / status.durationMillis;
//     setVideoProgress(progress);
//   };

//   const handleSeek = (value) => {
//     const position = value * status.durationMillis;
//     videoRef.current.setPositionAsync(position);
//   };

//   useEffect(() => {
//     const subscription = ScreenOrientation.addOrientationChangeListener(
//       ({orientationInfo}) => {
//         // Handle orientation changes
//       }
//     );

//     return () => {
//       ScreenOrientation.removeOrientationChangeListener(subscription);
//     };
//   }, []);

//   const handlePlayPause = async () => {
//     status.isPlaying
//       ? await videoRef.current.pauseAsync()
//       : await videoRef.current.playAsync();
//     setOverlayVisible(false); // Optionally hide controls after play/pause
//   };

//   const handleSkip = async (seconds) => {
//     const newPosition = status.positionMillis + seconds * 1000;
//     await videoRef.current.setPositionAsync(newPosition);
//   };

//   const toggleModal = async () => {
//     if (modalVisible) {
//       // If closing the video, lock to portrait
//       await ScreenOrientation.lockAsync(
//         ScreenOrientation.OrientationLock.PORTRAIT
//       );
//     } else {
//       // If opening the video, lock to landscape
//       await ScreenOrientation.lockAsync(
//         ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
//       );
//     }
//     setModalVisible(!modalVisible);
//   };

//   const handleSliderChange = (value) => {
//     const newPosition = value * status.durationMillis;
//     videoRef.current.setPositionAsync(newPosition);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Card Component */}
//       <TouchableOpacity style={styles.card} onPress={toggleModal}>
//         <Image
//           style={styles.cardImage}
//           source={{uri: 'https://placekitten.com/200/200'}}
//         />
//         <Text style={styles.cardText}>Click to Play Video</Text>
//       </TouchableOpacity>

//       {/* Fullscreen Video Modal */}
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={modalVisible}
//         onRequestClose={toggleModal}
//       >
//         <TouchableOpacity
//           style={styles.videoTouchable}
//           onPress={() => setOverlayVisible(!overlayVisible)}
//         >
          // <Video
          //   ref={videoRef}
          //   style={styles.video}
          //   source={{
          // uri: "https://ca1-hs101-1.shegu.net/vip/p1/tv_mp4_h264/7/1/71/1/tv.71.S1E5.720p.H264.20211118152556.mp4?KEY1=-FHomwEKo2icmOx3gd2rXg&KEY2=1714105605&KEY3=1&KEY4=world&KEY7=0&KEY8=0"

          //     // uri: 'https://eb.netmagcdn.com:2228/hls-playback/2a8bbcc47b80562849407d4706e03c0d399d3204b0702ae82aba09f072a793a0afced62262be2c2cec9f15f780d5d94e2278dd118f8514e7472f44a5d21c6241b85d3aed1c55b323146dedbb20046fe5d0f0f07f3f8d8ee0c697c11bfe658459a332d1217e50bb394bf4788530411106d15d6851aad651c825559a52125958afffe15cadf9e20ce8bca675291d6e962712cccbfa49126b7c496088e250ce3f5e9e810f2b4b5e60c7935fe6e3a540344c/index-f1-v1-a1.m3u8',
          //   }}
          //   resizeMode="contain"
          //   isLooping
          //   useNativeControls={useNativeControls}
          //   onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          // />
//           {overlayVisible && (
//             <View style={styles.overlay}>
//               {/* Top Row */}
//               <View style={styles.topRow}>
//                 <TouchableOpacity
//                   onPress={toggleModal}
//                   style={styles.backButton}
//                 >
//                   <FontAwesome name="arrow-left" size={24} color="#FFF" />
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Big Buck Bunny</Text>
//                 <View style={styles.spacer}></View>
//               </View>
//               {/* Middle Row */}
//               <View style={styles.middleRow}>
//                 <TouchableOpacity
//                   onPress={() => handleSkip(-10)}
//                   style={styles.controlButton}
//                 >
//                   <FontAwesome name="backward" size={30} color="white" />
//                   <Text style={styles.controlText}>10</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={handlePlayPause}
//                   style={styles.controlButton}
//                 >
//                   <FontAwesome
//                     name={status.isPlaying ? 'pause' : 'play'}
//                     size={30}
//                     color="white"
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => handleSkip(10)}
//                   style={styles.controlButton}
//                 >
//                   <FontAwesome name="forward" size={30} color="white" />
//                   <Text style={styles.controlText}>10</Text>
//                 </TouchableOpacity>
//               </View>
//               {/* Bottom Row */}
//               <View style={styles.bottomRow}>
//                 <Slider
//                   style={styles.slider}
//                   value={videoProgress}
//                   onValueChange={handleSliderChange}
//                   minimumValue={0}
//                   maximumValue={1}
//                   minimumTrackTintColor="#FFFFFF"
//                   maximumTrackTintColor="#000000"
//                   thumbTintColor="#FFFFFF"
//                 />
//               </View>
//             </View>
//           )}
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // ...your existing styles
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'space-between',
//   },
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 10,
//     paddingHorizontal: 20,
//   },
//   title: {
//     color: 'white',
//     fontSize: 18,
//     flex: 1,
//     textAlign: 'center',
//   },
//   backButton: {
//     // Add style if needed
//   },
//   spacer: {
//     width: 24, // Same size as your back button for symmetry
//   },
//   bottomRow: {
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//   },
//   slider: {
//     width: '100%',
//   },
//   card: {
//     elevation: 4,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 200,
//     width: '80%',
//     marginVertical: 20,
//   },
//   cardImage: {
//     width: '100%',
//     height: '80%',
//     borderRadius: 4,
//   },
//   cardText: {
//     paddingTop: 10,
//     fontSize: 18,
//   },
//   closeButton: {
//     alignSelf: 'center',
//     backgroundColor: 'lightgrey',
//     padding: 10,
//     marginTop: 10,
//   },
//   closeButtonText: {
//     fontSize: 18,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   videoTouchable: {
//     width: '100%',
//     aspectRatio: 16 / 9, // Adjust the aspect ratio
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   controlButton: {
//     alignItems: 'center',
//   },
//   controlText: {
//     color: 'white',
//   },
//   // Add any additional styles for your modal and close button here
// });

// export default TabOneScreen;

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Video } from 'expo-av';

const TabOneScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [status, setStatus] = useState({});

  const videoRef = useRef(null);
  const videos = [
    { id: '1',           uri: "https://ca1-hs101-1.shegu.net/vip/p1/tv_mp4_h264/7/1/71/1/tv.71.S1E5.720p.H264.20211118152556.mp4?KEY1=-FHomwEKo2icmOx3gd2rXg&KEY2=1714105605&KEY3=1&KEY4=world&KEY7=0&KEY8=0"
    , thumbnail: 'https://placekitten.com/200/300', title: 'First Video' },
    { id: '2',          uri: "https://ca1-hs101-1.shegu.net/vip/p1/tv_mp4_h264/7/1/71/1/tv.71.S1E5.720p.H264.20211118152556.mp4?KEY1=-FHomwEKo2icmOx3gd2rXg&KEY2=1714105605&KEY3=1&KEY4=world&KEY7=0&KEY8=0"
    , thumbnail: 'https://placekitten.com/201/301', title: 'Second Video' },
    { id: '3',           uri: "https://ca1-hs101-1.shegu.net/vip/p1/tv_mp4_h264/7/1/71/1/tv.71.S1E5.720p.H264.20211118152556.mp4?KEY1=-FHomwEKo2icmOx3gd2rXg&KEY2=1714105605&KEY3=1&KEY4=world&KEY7=0&KEY8=0"
    , thumbnail: 'https://placekitten.com/202/302', title: 'Third Video' },
    // Add more videos as needed
  ];
  
  // Mock function to simulate fetching an M3U8 URL
  const fetchVideoUrl = async () => {
    // Replace this URL with the actual API call to fetch the M3U8 URL
    return "file:////vidsrc.stream/rcp/NzYxYTE0MDFiZmM0NzllZjVlNzYxOGI2YzJhZGQ5NTI6ZVZsMVdVNXpia1JvUjNWV1EwbHlhRzFSV1ZGNU9XVmljamRrZDBkNGRFVlVibHB5VFhKNGRsTm5WMGRUZFdSVFUwMVlTSGg0VHl0emFuQlNiRUpoT0VVeWVsVm1ZbVJpZFZaRE5FNWtWakF6Y0ZCMVRIZFlWMGRtS3pOU1VHSnhURzRyVFU1amIxYzVXR1JuWWxwVFoxbExNbEZ2YmtFNVpHUmliR1l4TDJncmNWRTJjbXhSV0UxNVNsSXpaMjlSZGxKSk5HcDFTSHBQUVdWTVoxazRlRU5GUkRsU1YzcEtSVTFEYVZGQ2NFd3plbTFRYVRGWlQwZDZNRkZMYVVWelJFMXFUR1ZHYUdGV1FrdzFjVFJXTlZGYU1DdHJXV1V6TjJsS2VHWlNkV2x1VURjMVZFVndPRWM0YTJaM1NYRlVWSEJaYVVaWVN6SllMMEZ5YkN0eWFWbEJWVWRUVlVzdmIxbzBNblJZUkROdlRYYzJWblJDYkhSQ1lWQm1UREZYVnpNeWN6WkdZMFZwZFRGaU9UZDFLMDR6UmtwWVlsVjRaM3BNUTFGTE0yUlhXV2gxWlVrck5EWjNSblZFVTFSR1REWjJUSFF2TjB0eWRGWkZjbk42ZEZNNE5VcEtkMmRqUlZoT1Z6UnZUbWRyVFc0eGRWRTRjWFJ3UVVKclowTmFUQ3RuYzJaM01teDFMM1VyVlZaME5FTmtNSGRNUjBNemNHeDZTakZ5TlhZMFkwcDFiMnRGZUZaM1NEaFhLMU5HUlRsYWMyNDVTakl3WmtsMFFsTnRNSFl2VmtSV1FsZGpWVUZHT1ZBMGRUQmlkbmg1T1ZSdU5ETTJXRXBCUTB0T1pWbGxaMFZZU1U1VFZGcFNabVl5S3pCVlJtOXZSbmxWZEVOVmFFRkNRelpoZEVWc1JHWm5PRVlyUkRsV00yeGhXVWxZVW1Sd2JFcFBTVE55VVdKS2RYZ3ZTRFJ0ZW0xWWRsVnpSR3h3YkRKNFMwSmhTVkpQZVhScmNuWkxXR05tYkZkMVFuSnZTMmh5VGtsQk5qazRlRXhHWTJ0Sk1sRkxibTVXYkU4NWRuSkRZWFpYU2xwUlVGUk9Ua3BhTDFJM1RVY3JlRXhJU1RCRVNVTXZXbXhvVm1wdFJFaGxhbE5VV0hJeU9IUlNkbFJ6TjJwQk9YTllaM050VnpKdE1sUjNWbXRUVW5STVRETnFTRFJJVEZaVVpGZE9TVlprVWxscmF6Tk1UVEZFWTB4SFZtaDRPVXg1Tm1odVVHcFplRVphVVZSdWFrbDBRVW8xZGk5aVMzWlJVWEJyTmxCUlVWQnNTekk1TTNvd1NVUlpXVFV3YlhCUlV6WjZaalpXUTNVNU5XVldReXMxZERVeUwyNDNibWxRY1dGcVVFOHdOSHBoY0hKTFVqaGtVbmxqVmt4amFuVlRlbkp5TjFjeGRYVTVMMUpxZFhSdmQybHlZV3RhU1daSGNtdzVaMUpZY1d0MVMyUkhkVkJ2Tm1sTFpVaElMMHBZZVhkb1NUZExiRmx1ZEN0alNIZGpOMjQxVm1rcmFUaDZZaXRKU0VjNWQwZHpUR0ZrY1dnclR6aGhOeTgxUVdKdmVXUjVjSGhhZUZKMGVVRjNURkJaT1hwQ05IaG9NVll3VEVKM1UzZ3ZTR1ZGYzIxUVNteG9lbTlOWjFGRmRuWnFZVWxSUlVsWVVWZEZjV0ZZYTFGMFV6SkdXVkJGVGtRNVNGUXZZVWxDUVQwOQ--";
  };

  const handleOpenVideo = async (video) => {
    const url = await fetchVideoUrl(); // Fetch or generate the M3U8 URL
    setSelectedVideo({ ...video, uri: url });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      { /* Video Thumbnails */}
      {/* {videos.map((video) => (
        <TouchableOpacity
          key={video.id}
          style={styles.card}
          onPress={() => handleOpenVideo(video)}
        >
          <Image
            style={styles.thumbnail}
            source={{ uri: video.thumbnail }}
          />
          <Text style={styles.title}>{video.title}</Text>
        </TouchableOpacity>
      ))}

      { /* Fullscreen Video Modal */}
      {/* <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableOpacity
          style={styles.modalContent}
          onPress={() => setModalVisible(false)}
        >
          {selectedVideo && ( */} 
          {/* */} 
            <Video
              ref={videoRef}
              style={styles.video}
              source={{ uri: "file:////vidsrc.stream/rcp/NzYxYTE0MDFiZmM0NzllZjVlNzYxOGI2YzJhZGQ5NTI6ZVZsMVdVNXpia1JvUjNWV1EwbHlhRzFSV1ZGNU9XVmljamRrZDBkNGRFVlVibHB5VFhKNGRsTm5WMGRUZFdSVFUwMVlTSGg0VHl0emFuQlNiRUpoT0VVeWVsVm1ZbVJpZFZaRE5FNWtWakF6Y0ZCMVRIZFlWMGRtS3pOU1VHSnhURzRyVFU1amIxYzVXR1JuWWxwVFoxbExNbEZ2YmtFNVpHUmliR1l4TDJncmNWRTJjbXhSV0UxNVNsSXpaMjlSZGxKSk5HcDFTSHBQUVdWTVoxazRlRU5GUkRsU1YzcEtSVTFEYVZGQ2NFd3plbTFRYVRGWlQwZDZNRkZMYVVWelJFMXFUR1ZHYUdGV1FrdzFjVFJXTlZGYU1DdHJXV1V6TjJsS2VHWlNkV2x1VURjMVZFVndPRWM0YTJaM1NYRlVWSEJaYVVaWVN6SllMMEZ5YkN0eWFWbEJWVWRUVlVzdmIxbzBNblJZUkROdlRYYzJWblJDYkhSQ1lWQm1UREZYVnpNeWN6WkdZMFZwZFRGaU9UZDFLMDR6UmtwWVlsVjRaM3BNUTFGTE0yUlhXV2gxWlVrck5EWjNSblZFVTFSR1REWjJUSFF2TjB0eWRGWkZjbk42ZEZNNE5VcEtkMmRqUlZoT1Z6UnZUbWRyVFc0eGRWRTRjWFJ3UVVKclowTmFUQ3RuYzJaM01teDFMM1VyVlZaME5FTmtNSGRNUjBNemNHeDZTakZ5TlhZMFkwcDFiMnRGZUZaM1NEaFhLMU5HUlRsYWMyNDVTakl3WmtsMFFsTnRNSFl2VmtSV1FsZGpWVUZHT1ZBMGRUQmlkbmg1T1ZSdU5ETTJXRXBCUTB0T1pWbGxaMFZZU1U1VFZGcFNabVl5S3pCVlJtOXZSbmxWZEVOVmFFRkNRelpoZEVWc1JHWm5PRVlyUkRsV00yeGhXVWxZVW1Sd2JFcFBTVE55VVdKS2RYZ3ZTRFJ0ZW0xWWRsVnpSR3h3YkRKNFMwSmhTVkpQZVhScmNuWkxXR05tYkZkMVFuSnZTMmh5VGtsQk5qazRlRXhHWTJ0Sk1sRkxibTVXYkU4NWRuSkRZWFpYU2xwUlVGUk9Ua3BhTDFJM1RVY3JlRXhJU1RCRVNVTXZXbXhvVm1wdFJFaGxhbE5VV0hJeU9IUlNkbFJ6TjJwQk9YTllaM050VnpKdE1sUjNWbXRUVW5STVRETnFTRFJJVEZaVVpGZE9TVlprVWxscmF6Tk1UVEZFWTB4SFZtaDRPVXg1Tm1odVVHcFplRVphVVZSdWFrbDBRVW8xZGk5aVMzWlJVWEJyTmxCUlVWQnNTekk1TTNvd1NVUlpXVFV3YlhCUlV6WjZaalpXUTNVNU5XVldReXMxZERVeUwyNDNibWxRY1dGcVVFOHdOSHBoY0hKTFVqaGtVbmxqVmt4amFuVlRlbkp5TjFjeGRYVTVMMUpxZFhSdmQybHlZV3RhU1daSGNtdzVaMUpZY1d0MVMyUkhkVkJ2Tm1sTFpVaElMMHBZZVhkb1NUZExiRmx1ZEN0alNIZGpOMjQxVm1rcmFUaDZZaXRKU0VjNWQwZHpUR0ZrY1dnclR6aGhOeTgxUVdKdmVXUjVjSGhhZUZKMGVVRjNURkJaT1hwQ05IaG9NVll3VEVKM1UzZ3ZTR1ZGYzIxUVNteG9lbTlOWjFGRmRuWnFZVWxSUlVsWVVWZEZjV0ZZYTFGMFV6SkdXVkJGVGtRNVNGUXZZVWxDUVQwOQ--" }}
              resizeMode="contain"
              isLooping
              shouldPlay
              useNativeControls
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
       {/* <TouchableOpacity
      //       style={styles.closeButton}
      //       onPress={() => setModalVisible(false)}
      //     >
      //       <Text style={styles.closeButtonText}>Close</Text>
      //     </TouchableOpacity> */}
      {/* </TouchableOpacity> */}
      {/* // </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  card: {
    margin: 10,
    width: 300,
    height: 170,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  title: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    textAlign: 'center',
    padding: 5
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  video: {
    width: '100%',
    height: 300
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  }
});

export default TabOneScreen;


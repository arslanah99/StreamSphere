// import {StyleSheet, ScrollView, Dimensions} from 'react-native';
// import VideoPlayer from 'expo-video-player';
// import {setStatusBarHidden} from 'expo-status-bar';
// import {ResizeMode} from 'expo-av';
// import * as ScreenOrientation from 'expo-screen-orientation';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import {Text, View} from '@/components/Themed';
// import {useRef, useState} from 'react';

// export default function TabOneScreen() {
//   const [inFullscreen, setInFullsreen] = useState(false);
//   const [inFullscreen2, setInFullsreen2] = useState(false);
//   const [isMute, setIsMute] = useState(false);
//   const refVideo = useRef(null);
//   const refVideo2 = useRef(null);
//   const refScrollView = useRef(null);

//   return (
//     <ScrollView
//       scrollEnabled={!inFullscreen2}
//       ref={refScrollView}
//       onContentSizeChange={() => {
//         if (inFullscreen2) {
//           refScrollView.current.scrollToEnd({animated: true});
//         }
//       }}
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//     >
//       <Text
//         style={[styles.text, {fontWeight: 'bold', textTransform: 'uppercase'}]}
//       >
//         Examples
//       </Text>
//       {/* ShouldPlay (autoplay) is true only in the first example */}
//       <Text style={styles.text}>Basic</Text>
//       {/* <VideoPlayer
//         videoProps={{
//           shouldPlay: true,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//         }}
//       />

//       <Text style={styles.text}>Local file</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: require('../../assets/local.mp4'),
//         }}
//         style={{ height: 160 }}
//       />

//       <Text style={styles.text}>Only video without controls</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//         }}
//         slider={{
//           visible: false,
//         }}
//         fullscreen={{
//           visible: false,
//         }}
//         timeVisible={false}
//         style={{ height: 160 }}
//       />

//       <Text style={styles.text}>Some styling</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//         }}
//         style={{
//           videoBackgroundColor: 'transparent',
//           controlsBackgroundColor: 'red',
//           height: 200,
//         }}
//       />

//       <Text style={styles.text}>With custom icons</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//         }}
//         icon={{
//           play: <Text style={{ color: '#FFF' }}>PLAY</Text>,
//           pause: <Text style={{ color: '#FFF' }}>PAUSE</Text>,
//         }}
//         style={{ height: 160 }}
//       /> */}

//       <Text style={styles.text}>With some more styling</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//           ref: refVideo2,
//         }}
//         fullscreen={{
//           inFullscreen: inFullscreen2,
//           enterFullscreen: async () => {
//             setStatusBarHidden(true, 'fade');
//             setInFullsreen2(true);
//             await ScreenOrientation.lockAsync(
//               ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
//             );
//             refVideo2.current.setStatusAsync({
//               shouldPlay: true,
//             });
//           },
//           exitFullscreen: async () => {
//             setStatusBarHidden(false, 'fade');
//             setInFullsreen2(false);
//             await ScreenOrientation.lockAsync(
//               ScreenOrientation.OrientationLock.DEFAULT
//             );
//             refVideo2.current.setStatusAsync({
//               shouldPlay: false,
//             });
//           },
//         }}
//         style={{
//           width: inFullscreen2 ? Dimensions.get('window').height : 320,
//           height: inFullscreen2 ? Dimensions.get('window').width : 160,
//           videoBackgroundColor: 'black',
//           controlsBackgroundColor: 'gray',
//         }}
//         icon={{
//           play: <Text style={{color: '#FFF'}}>▶️</Text>,
//           pause: <Text style={{color: '#FFF'}}>⏸️</Text>,
//           fullscreen: <Text style={{color: '#FFF'}}>🔄</Text>,
//           exitFullscreen: <Text style={{color: '#FFF'}}>↩️</Text>,
//         }}
//         autoHidePlayer={true}
//       />

//       {/* 
//       <Text style={styles.text}>With Mute</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//           isMuted: isMute,
//         }}
//         mute={{
//           enterMute: () => setIsMute(!isMute),
//           exitMute: () => setIsMute(!isMute),
//           isMute,
//         }}
//         style={{ height: 160 }}
//       />

//       <Text style={styles.text}>Fullscren icon hidden</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//         }}
//         fullscreen={{
//           visible: false,
//         }}
//         style={{ height: 160 }}
//       />

//       <Text style={styles.text}>Ref - clicking on Enter/Exit fullscreen changes playing</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//           ref: refVideo,
//         }}
//         fullscreen={{
//           enterFullscreen: () => {
//             setInFullsreen(!inFullscreen)
//             refVideo.current.setStatusAsync({
//               shouldPlay: true,
//             })
//           },
//           exitFullscreen: () => {
//             setInFullsreen(!inFullscreen)
//             refVideo.current.setStatusAsync({
//               shouldPlay: false,
//             })
//           },
//           inFullscreen,
//         }}
//         style={{ height: 160 }}
//       />

//       <Text style={styles.text}>Fullscren</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//           ref: refVideo2,
//         }}
//         fullscreen={{
//           inFullscreen: inFullscreen2,
//           enterFullscreen: async () => {
//             setStatusBarHidden(true, 'fade')
//             setInFullsreen2(!inFullscreen2)
//             await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
//             refVideo2.current.setStatusAsync({
//               shouldPlay: true,
//             })
//           },
//           exitFullscreen: async () => {
//             setStatusBarHidden(false, 'fade')
//             setInFullsreen2(!inFullscreen2)
//             await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
//           },
//         }}
//         style={{
//           videoBackgroundColor: 'black',
//           height: inFullscreen2 ? Dimensions.get('window').width : 160,
//           width: inFullscreen2 ? Dimensions.get('window').height : 320,
//         }}
//       />

//       <Text style={styles.text}>Custom title</Text>
//       <VideoPlayer
//         videoProps={{
//           shouldPlay: false,
//           resizeMode: ResizeMode.CONTAIN,
//           source: {
//             uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//           },
//         }}
//         style={{
//           videoBackgroundColor: 'black',
//         }}
//         header={<Text style={{ color: '#FFF' }}>Custom title</Text>}
//       /> */}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFF',
//     flex: 1,
//   },
//   contentContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 40,
//   },
//   text: {
//     marginTop: 36,
//     marginBottom: 12,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

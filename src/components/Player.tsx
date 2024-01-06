import React, {useState, useCallback} from 'react';
import {
  View,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface PlayerProps {}

const Player: React.FC<PlayerProps> = () => {
  const [url, setURL] = useState<string>(
    'https://www.youtube.com/watch?v=26D3NGDZvvk',
  );

  const [isPlay, setPlay] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>('26D3NGDZvvk');

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      Alert.alert('video has finished playing!');
    }
  }, []);

  const getYouTubeVideoId = () => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return (match && match[1]) || '';
  };

  const playVideo = () => {
    setPlay(true);
    const videoUniqueId = getYouTubeVideoId();
    setVideoId(videoUniqueId);
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.headerText}>[T] Player</Text>
          <View style={styles.spacing} />
          <YoutubePlayer
            height={300}
            play={false}
            videoId={'VSXWiu8l6g4'}
            onChangeState={onStateChange}
          />
          <View style={styles.rowContainer}>
            <View style={styles.flex1}>
              <TextInput
                placeholder="Enter youtube video url"
                value={url}
                onChangeText={setURL}
                style={styles.textInput}
              />
            </View>
            <TouchableOpacity
              disabled={url?.trim()?.length! <= 3}
              onPress={playVideo}
              style={styles.playButton}>
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
          </View>
          {isPlay ? (
            <YoutubePlayer
              height={300}
              play={false}
              videoId={videoId}
              onChangeState={onStateChange}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 11,
    paddingTop: 11,
  },
  headerText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 30,
    fontWeight: '900',
  },
  spacing: {
    height: 11,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  textInput: {
    paddingLeft: 11,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 11,
  },
  playButton: {
    width: 100,
    height: 51,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
};

export default Player;

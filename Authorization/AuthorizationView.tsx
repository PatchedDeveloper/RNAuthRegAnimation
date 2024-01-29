import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Animated, Easing, Modal } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainHeader from '../../modules/MainHeader';
import { colors } from '../../modules/theme';
import { TextInputMask } from 'react-native-masked-text';
import RegistrationView from '../Authorization/RegistrationView';

//!view for authorization
const AuthorizationView = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showMask, setShowMask] = useState(true);


  const [RegViewVisible, setRegViewVisible] = useState(false);

  const openRegView = () => {
    setRegViewVisible(true);
    console.log('----OpenRegistrationView----');
  };

  const closeRegView = () => {
    setRegViewVisible(false);
  };

  const handleLogin = () => {
    
    console.log('----Try Enter----');
    console.log('Username:', username);
    console.log('Password:', password);

  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleMask = () => {
    setShowMask(!showMask);
  };

  return (
    <View style={styles.container}>
      <MainHeader title="" />

      <View style={styles.content}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Image
            source={require('../../../Assets/ico/Profile/arrow.png')}
            style={[styles.backButtonImage, { transform: [{ scaleX: -1 }] }]}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={{ 
          position: 'absolute',
          top: 100,
          left: 300, 
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
        }}>
          <Image
            source={require('../../../Assets/ico/Bubbles/sphprb.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>

        <Bubbles />

        
        <View style={styles.centeredBox}>
        <Text style={styles.text}>Authorization</Text>

      <View style={{marginTop: 40}}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10, marginBottom: 10 }}>
        <Image
            source={require('../../../Assets/ico/Authorization/user.png')}
            style={{ height: 20, width: 20, position: 'relative', marginBottom: 20 }}
        />
        <TextInput
            style={[styles.input, { marginLeft: 10 }]}  
            placeholder="Username"
            placeholderTextColor="gray"
            value={username}
            onChangeText={(text) => setUsername(text)}
        />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10, }}>
        <Image
            source={require('../../../Assets/ico/Authorization/password.png')}
            style={{ height: 20, width: 20, position: 'relative', marginBottom: 20 }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                style={[styles.input, { marginLeft: 10, flex: 1 }]}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={showMask}
            />
            <TouchableOpacity onPress={toggleMask} style={styles.buttoned}>
                <Image
                source={showMask ? require('../../../Assets/ico/hide.png') : require('../../../Assets/ico/view.png')}
                style={{ width: 20, height: 20 }}
                />
            </TouchableOpacity>
            </View>

        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

        </View>
      </View>

      <View style={[{ position: 'absolute', marginTop: 650, alignSelf: 'center' }]}>
  <Text style={{fontSize: 15, textAlign: 'center', alignSelf: 'center', color: 'gray', fontWeight: 'bold', }}>DON’T HAVE ACCOUNT?</Text>
    </View>

    <View style={[{ position: 'absolute', marginTop: 670, alignSelf: 'center' }]}>
    <TouchableOpacity style={{ 
    padding: 10,
    borderRadius: 30,
    marginTop: -10,
    height: 54,
    width: 254,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', 
    }} onPress={openRegView}>
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={RegViewVisible}
        onRequestClose={closeRegView}
      >
        <RegistrationView onClose={closeRegView} />
      </Modal>   
    </View>
  );
};


//! Logic Animation
const createBubbleAnimation = (animatedValue, direction = 1) => {
  const moveAnimation = Animated.timing(animatedValue, {
    toValue: animatedValue._value + direction * 10,
    duration: 2000,
    easing: Easing.linear,
    useNativeDriver: false,
  });

  return moveAnimation;
};

const Bubbles = () => {
  const bubble1Y = new Animated.Value(-90);
  const bubble2Y = new Animated.Value(330);
  const bubble3Y = new Animated.Value(250);

  const animateBubbles = () => {
    const animateBubble1 = createBubbleAnimation(bubble1Y);
    const animateBubble2 = createBubbleAnimation(bubble2Y);
    const animateBubble3 = createBubbleAnimation(bubble3Y);

    Animated.parallel([animateBubble1, animateBubble2, animateBubble3]).start(() => {
      
      animateBubblesReverse();
    });
  };

  const animateBubblesReverse = () => {
    const animateBubble1 = createBubbleAnimation(bubble1Y, -1);
    const animateBubble2 = createBubbleAnimation(bubble2Y, -1);
    const animateBubble3 = createBubbleAnimation(bubble3Y, -1);

    Animated.parallel([animateBubble1, animateBubble2, animateBubble3]).start(() => {
      
      animateBubbles();
    });
  };

  useEffect(() => {
    animateBubbles();


    return () => {
      bubble1Y.removeAllListeners();
      bubble2Y.removeAllListeners();
      bubble3Y.removeAllListeners();
    };
  }, []);

  return (
    <View>
      <Animated.View
        style={{
          position: 'absolute',
          top: bubble1Y,
          left: -400,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Image
          source={require('../../../Assets/ico/Bubbles/sphgrn.png')}
          style={{ width: 300, height: 300 }}
        />
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          top: bubble2Y,
          left: -270,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Image
          source={require('../../../Assets/ico/Bubbles/spurpl.png')}
          style={{ width: 150, height: 160 }}
        />
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          top: bubble3Y,
          left: 150,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <Image
          source={require('../../../Assets/ico/Bubbles/spurpl.png')}
          style={{ width: 150, height: 160 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // for Android
    height: '40%', 
    width: '90%', 
    marginTop: 20, 
    zIndex: 2, 
    borderWidth: 1, 
    borderColor: 'black', 
  },
  text: {
    color: colors.purp,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    zIndex: 3, 
    marginLeft: -15,
  },
  backButtonImage: {
    width: 20,
    height: 20,
    marginRight: 0,
  },
  backButtonText: {
    fontSize: 20,
    color: 'black',
  },
  input: {
    width: '90%',
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginLeft: 10,
    padding: 10,
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: colors.purp,
    padding: 10,
    borderRadius: 30,
    marginTop: 30,
    height: 54,
    width: 254,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', 
    elevation: 5, // для Android
    shadowColor: colors.purp, // для iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttoned: {
    padding: 10,
    marginTop: -5,
    alignItems: 'center',
  },

});

export default AuthorizationView;

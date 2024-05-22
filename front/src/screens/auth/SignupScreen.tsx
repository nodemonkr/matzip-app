import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import {validateSignup} from '../../utils';

// 로그인에서 구현한 부분과 같이 useForm이라는 만들어둔 훅을 사용하여 데이터를 관리하고
// passwordConfirm이라는 새로운 속성을 추가하여 해당 속성은 password 재확인을 위해 사용한다
function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });
  const handleSubmit = () => {
    console.log(signup.values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          // 키보드에 다음 버튼을 만들기위해 returnKeyType 옵션을 켜줌
          returnKeyType="next"
          //키보드가 닫히지 않도록 blurOnSubmit을 false로 줌
          blurOnSubmit={false}
          // next나 다음 버튼을 키보드에서 눌렀을때 다음 input창으로 넘어가기 위한 옵션추가
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />

        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          // 비밀번호 경고창 띄우지 않도록
          textContentType="oneTimeCode"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;

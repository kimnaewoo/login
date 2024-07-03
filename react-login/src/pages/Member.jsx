import { Link } from 'react-router-dom';
import '../css/index.css';
import { useContext, useState } from 'react';
import { Con } from '../modules/Context';
import { initData } from '../data/member';

export function Member() {
  const myCon = useContext(Con);

  const [userId, setUserId] = useState('');
  const [pwd, setPwd] = useState('');
  const [chkpwd, setChkPwd] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const [userIdError, setUserIdError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [chkpwdError, setChkPwdError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const msgId = ['5글자 이상 입력해주세요!', '중복된 아이디입니다!', '가입이 가능한 아이디입니다!'];

  const msgEtc = {
    pwd: '영문, 숫자, 특수문자 포함 8자이상 입력해주세요!',
    confpwd: '비밀번호가 일치하지 않습니다!',
    req: '필수 항목입니다!',
    email: '형식이 올바르지 않습니다!',
  };

  const [idMsg, setIdMsg] = useState(msgId[0]);

  const changeUserId = (e) => {
    const valid = /^[A-Za-z0-9+]{5,}$/;

    if (valid.test(e.target.value)) {
      initData();

      let memData = localStorage.getItem('mem-data');

      memData = JSON.parse(memData);

      let isOK = true;

      memData.forEach((v) => {
        if (v.uid === e.target.value) {
          setIdMsg(msgId[1]);
          setUserIdError(true);
          isOK = false;
        }
      });

      if (isOK) {
        setIdMsg(msgId[0]);
        setUserIdError(false);
      }
    } else {
      setUserIdError(true);
    }

    setUserId(e.target.value);
  };

  const changePwd = (e) => {
    const valid = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (valid.test(e.target.value)) setPwdError(false);
    else setPwdError(true);

    setPwd(e.target.value);
  };

  const changeChkPwd = (e) => {
    if (pwd === e.target.value) setChkPwdError(false);
    else setChkPwdError(true);

    setChkPwd(e.target.value);
  };

  const changeUserName = (e) => {
    if (e.target.value !== '') setUserNameError(false);
    else setUserNameError(true);

    setUserName(e.target.value);
  };

  const changeEmail = (e) => {
    const valid =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (valid.test(e.target.value)) setEmailError(false);
    else setEmailError(true);

    setEmail(e.target.value);
  };

  const totalValid = () => {
    if (!userId) setUserIdError(true);
    if (!pwd) setPwdError(true);
    if (!chkpwd) setChkPwdError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);

    if (
      userId &&
      pwd &&
      chkpwd &&
      userName &&
      email &&
      !userIdError &&
      !pwdError &&
      !chkpwdError &&
      !userNameError &&
      !emailError
    )
      return true;
    else return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (totalValid()) {
      initData();

      let memData = localStorage.getItem('mem-data');
      memData = JSON.parse(memData);
      let newData = {
        idx: memData.length + 1,
        uid: userId,
        pwd: pwd,
        unm: userName,
        eml: email,
      };
      memData.push(newData);
      localStorage.setItem('mem-data', JSON.stringify(memData));
      document.querySelector('.sbtn').innerText = '님은 이제 회원입니다.';
      myCon.chgPage('login', {});
    } else {
      alert('change your input!');
    }
  };

  return (
    <div className="page">
      <div className="titlewrap">회원가입</div>

      <div className="contentwrap">
        <div className="inputwrap">
          <input className="input" placeholder="아이디를 입력해주세요." />
        </div>
        <div style={{ marginTop: '35px' }} className="inputwrap">
          <input className="input" placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
        </div>
        <div style={{ marginTop: '35px' }} className="inputwrap">
          <input className="input" placeholder="이름을 입력해주세요." />
        </div>
        <div style={{ marginTop: '35px' }} className="inputwrap">
          <input className="input" placeholder="이메일을 입력해주세요." />
        </div>
        <div className="errormessagewrap"></div>
      </div>
      <Link to="/">
        <button className="bottombutton">돌아가기</button>
      </Link>
      <div>
        <button disabled={true} className="bottombutton">
          확인
        </button>
      </div>
    </div>
  );
}

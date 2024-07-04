import { Link, useNavigate } from 'react-router-dom';
import '../css/member.css';
import { useEffect, useState } from 'react';
import { initData } from '../data/member';

export function Member() {
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

  const navigate = useNavigate();

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
      alert('회원가입이 완료되었습니다!');
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
      navigate('/');
    } else {
      alert('입력란을 채워주세요!');
    }
  };

  return (
    <div className="page">
      <div className="titlewrap">회원가입</div>

      <div className="contentwrap">
        {/* 아이디 */}
        <div className="inputwrap">
          <input className="input" placeholder="아이디를 입력해주세요." value={userId} onChange={changeUserId} />
          {userIdError && (
            <div className="msg">
              <small style={{ color: 'red', fontSize: '10px', left: '10%' }}>{idMsg}</small>
            </div>
          )}
          {!userIdError && userId && (
            <div className="msg" style={{ left: '7%' }}>
              <small style={{ color: 'green', fontSize: '10px' }}>{msgId[2]}</small>
            </div>
          )}
        </div>
        {/* 비밀번호 */}
        <div style={{ marginTop: '35px' }} className="inputwrap">
          <input className="input" placeholder="영문, 숫자, 특수문자 포함 8자 이상" value={pwd} onChange={changePwd} />
          {pwdError && (
            <div className="msg" style={{ left: '1%', width: '80%' }}>
              <small style={{ color: 'red', fontSize: '10px' }}>{msgEtc.pwd}</small>
            </div>
          )}
        </div>
        {/* 비밀번호 확인 */}
        <div style={{ marginTop: '35px' }} className="inputwrap">
          <input className="input" placeholder="비밀번호를 확인해주세요." value={chkpwd} onChange={changeChkPwd} />
          {chkpwdError && (
            <div className="msg" style={{ left: '5%' }}>
              <small style={{ color: 'red', fontSize: '10px' }}>{msgEtc.confpwd}</small>
            </div>
          )}
        </div>
        {/* 이름 */}
        <div style={{ marginTop: '35px' }} className="inputwrap">
          <input className="input" placeholder="이름을 입력해주세요." value={userName} onChange={changeUserName} />
          {userNameError && (
            <div className="msg" style={{ left: '17%' }}>
              <small style={{ color: 'red', fontSize: '10px' }}>{msgEtc.req}</small>
            </div>
          )}
        </div>
        {/* 이메일 */}
        <div style={{ marginTop: '35px' }} className="inputwrap">
          <input className="input" placeholder="이메일을 입력해주세요." value={email} onChange={changeEmail} />
          {emailError && (
            <div className="msg" style={{ left: '9%' }}>
              <small style={{ color: 'red', fontSize: '10px' }}>{msgEtc.email}</small>
            </div>
          )}
        </div>
      </div>
      <Link to="/">
        <button className="bottombutton">돌아가기</button>
      </Link>
      <div>
        <button className="bottombutton" onClick={onSubmit}>
          완료
        </button>
      </div>
    </div>
  );
}

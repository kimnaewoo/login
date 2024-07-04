import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [pwdValid, setPwdValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^[A-Za-z0-9+]{5,}$/;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };
  const handlePwd = (e) => {
    setPwd(e.target.value);
    const regex = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (regex.test(pwd)) {
      setPwdValid(true);
    } else {
      setPwdValid(false);
    }
  };

  useEffect(() => {
    if (idValid && pwdValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwdValid]);

  let memData = localStorage.getItem('mem-data');
  const Data = JSON.parse(memData);
  const uids = Data.map((item) => item.uid);
  const pwds = Data.map((item) => item.pwd);
  const isAnyidIncluded = uids.includes(id);
  const isAnypwdIncluded = pwds.includes(pwd);

  const onClickConfirmButton = () => {
    if (isAnyidIncluded && isAnypwdIncluded) {
      alert('로그인에 성공하였습니다!');
    } else {
      alert('등록되지 않은 회원입니다!');
    }
  };

  return (
    <div className="page">
      <div className="titlewrap">
        아이디와 비밀번호를
        <br />
        입력해주세요.
      </div>

      <div className="contentwrap">
        <div className="inputtitle">아이디</div>
        <div className="inputwrap">
          <input className="input" type="text" placeholder="ex) kimnaewoo" value={id} onChange={handleId} />
        </div>
        <div className="errormessagewrap">{!idValid && id.length > 0 && <div>아이디 가 올바르지 않습니다.</div>}</div>
        <div style={{ marginTop: '26px' }} className="inputtitle">
          비밀번호
        </div>
        <div className="inputwrap">
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pwd}
            onChange={handlePwd}
          />
        </div>
        <div className="errormessagewrap">
          {!pwdValid && pwd.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}
        </div>
      </div>

      <Link to="/member">
        <button className="bottombutton">회원가입</button>
      </Link>
      <div>
        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottombutton">
          로그인
        </button>
      </div>
    </div>
  );
}

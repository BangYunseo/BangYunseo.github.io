// ========== 회원가입 ==========
async function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // 유효성 검사
  if (password !== confirmPassword) {
    showError("confirm-error", "비밀번호가 일치하지 않습니다.");
    return;
  }

  if (password.length < 6) {
    showError("password-error", "비밀번호는 6자 이상이어야 합니다.");
    return;
  }

  const btn = document.getElementById("register-btn");
  btn.disabled = true;
  btn.textContent = "가입 중...";

  try {
    // Firebase 회원가입
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = userCredential.user.uid;

    // Firestore에 사용자 정보 저장
    await db.collection("users").doc(uid).set({
      uid: uid,
      username: username,
      email: email,
      role: "pending",
      gameScore: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      approved: false,
    });

    alert("회원가입이 완료되었습니다! 관리자 승인 대기 중입니다.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("회원가입 오류:", error);
    let errorMsg = "회원가입에 실패했습니다.";

    if (error.code === "auth/email-already-in-use") {
      errorMsg = "이미 가입된 이메일입니다.";
    } else if (error.code === "auth/invalid-email") {
      errorMsg = "유효하지 않은 이메일입니다.";
    } else if (error.code === "auth/weak-password") {
      errorMsg = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    showError("register-error", errorMsg);
  } finally {
    btn.disabled = false;
    btn.textContent = "회원가입";
  }
}

// ========== 로그인 ==========
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const btn = document.getElementById("login-btn");
  btn.disabled = true;
  btn.textContent = "로그인 중...";

  try {
    // Firebase 로그인
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const uid = userCredential.user.uid;

    // 사용자 정보 조회
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    const userData = userDoc.data();

    // 로컬스토리지에 사용자 정보 저장
    localStorage.setItem("userUid", uid);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("username", userData.username);
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("approved", userData.approved);

    alert("로그인되었습니다!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("로그인 오류:", error);
    let errorMsg = "로그인에 실패했습니다.";

    if (error.code === "auth/user-not-found") {
      errorMsg = "등록되지 않은 이메일입니다.";
    } else if (error.code === "auth/wrong-password") {
      errorMsg = "비밀번호가 틀렸습니다.";
    } else if (error.code === "auth/invalid-email") {
      errorMsg = "유효하지 않은 이메일 형식입니다.";
    }

    showError("login-error", errorMsg);
  } finally {
    btn.disabled = false;
    btn.textContent = "로그인";
  }
}

// ========== 게스트 로그인 ==========
function handleGuestLogin() {
  localStorage.setItem("userRole", "guest");
  localStorage.setItem("username", "게스트 사용자");
  alert("게스트로 로그인되었습니다.");
  window.location.href = "index.html";
}

// ========== 로그아웃 ==========
async function logout() {
  try {
    await auth.signOut();
    localStorage.clear();
    alert("로그아웃되었습니다.");
    window.location.href = "index.html";
  } catch (error) {
    console.error("로그아웃 오류:", error);
  }
}

// ========== UI 업데이트 (네비 버튼 변경) ==========
function updateAuthUI() {
  const authLink = document.getElementById("auth-link");
  if (!authLink) return;

  const userRole = localStorage.getItem("userRole");
  const username = localStorage.getItem("username");

  if (userRole) {
    // 로그인 상태
    authLink.innerHTML = `
            <a href="#" onclick="logout(); return false;">
                ${username} (로그아웃)
            </a>
        `;
  } else {
    // 비로그인 상태
    authLink.innerHTML = `
            <a href="login.html">로그인</a>
        `;
  }
}

// ========== 비밀번호 강도 확인 ==========
function checkPasswordStrength() {
  const password = document.getElementById("reg-password").value;
  const meter = document.getElementById("strength-meter");

  if (!meter) return;

  let strength = "weak";
  let text = "약함";

  if (password.length >= 8) {
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
      strength = "strong";
      text = "강함";
    } else {
      strength = "medium";
      text = "중간";
    }
  }

  meter.textContent = `비밀번호 강도: ${text}`;
  meter.className = `password-strength strength-${strength}`;
  meter.style.display = "block";
}

// ========== 유틸 함수 ==========
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.display = "block";

    setTimeout(() => {
      element.style.display = "none";
    }, 5000);
  }
}

// ========== 페이지 로드 시 실행 ==========
document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();
});

// 전역으로 함수 노출
window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.handleGuestLogin = handleGuestLogin;
window.logout = logout;
window.checkPasswordStrength = checkPasswordStrength;

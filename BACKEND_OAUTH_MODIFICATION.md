# 백엔드 OAuth 수정 가이드

## 개요
네이티브 앱에서 OAuth 로그인 시 앱으로 돌아가도록 백엔드를 수정해야 합니다.

## 수정 사항

### 1. OAuth 시작 엔드포인트 수정
**파일**: OAuth 시작 엔드포인트 (예: `/oauth2/authorization/google`)

**수정 내용**:
```java
// 예시 (Spring Boot)
@GetMapping("/oauth2/authorization/google")
public void redirectToGoogle(HttpServletRequest request, HttpServletResponse response) {
    // 네이티브 앱 감지
    boolean isNativeApp = "true".equals(request.getParameter("is_native_app"));
    String platform = request.getParameter("platform");
    
    // 세션에 네이티브 앱 정보 저장
    HttpSession session = request.getSession();
    session.setAttribute("is_native_app", isNativeApp);
    session.setAttribute("platform", platform);
    
    // 기존 OAuth 리다이렉트 로직
    // ...
}
```

### 2. OAuth 콜백 엔드포인트 수정
**파일**: OAuth 콜백 엔드포인트 (예: `/oauth2/callback/google`)

**수정 내용**:
```java
// 예시 (Spring Boot)
@GetMapping("/oauth2/callback/google")
public void handleGoogleCallback(
    @RequestParam String code,
    @RequestParam(required = false) String error,
    HttpServletRequest request,
    HttpServletResponse response
) throws IOException {
    
    // 세션에서 네이티브 앱 정보 확인
    HttpSession session = request.getSession();
    Boolean isNativeApp = (Boolean) session.getAttribute("is_native_app");
    String platform = (String) session.getAttribute("platform");
    
    if (error != null) {
        // 에러 처리
        if (Boolean.TRUE.equals(isNativeApp)) {
            response.sendRedirect("minu://auth/error?error=" + URLEncoder.encode(error, "UTF-8"));
        } else {
            response.sendRedirect("/auth/google/callback?error=" + URLEncoder.encode(error, "UTF-8"));
        }
        return;
    }
    
    // OAuth 토큰 교환 로직
    // ...
    
    // 성공 시 리다이렉트
    if (Boolean.TRUE.equals(isNativeApp)) {
        // 네이티브 앱으로 리다이렉트
        response.sendRedirect("minu://auth/success");
    } else {
        // 웹으로 리다이렉트
        response.sendRedirect("/auth/google/callback?code=" + URLEncoder.encode(code, "UTF-8"));
    }
}
```

### 3. 추가 고려사항

#### User-Agent 감지 (선택사항)
```java
private boolean isNativeApp(HttpServletRequest request) {
    String userAgent = request.getHeader("User-Agent");
    return userAgent != null && (
        userAgent.contains("Capacitor") || 
        userAgent.contains("minu-app") ||
        // 기타 네이티브 앱 식별자
    );
}
```

#### 에러 처리
```java
// 에러 발생 시에도 앱 스킴으로 리다이렉트
if (Boolean.TRUE.equals(isNativeApp)) {
    response.sendRedirect("minu://auth/error?error=" + URLEncoder.encode(errorMessage, "UTF-8"));
} else {
    response.sendRedirect("/auth/google/callback?error=" + URLEncoder.encode(errorMessage, "UTF-8"));
}
```

## 테스트 방법

1. **웹에서 테스트**: `https://minu.site/oauth2/authorization/google`
2. **네이티브 앱에서 테스트**: `https://minu.site/oauth2/authorization/google?is_native_app=true&platform=ios`

## 예상 결과

- **웹**: `/auth/google/callback?code=...`로 리다이렉트
- **네이티브 앱**: `minu://auth/success`로 리다이렉트

## 주의사항

1. **세션 관리**: OAuth 플로우 중 세션이 유지되어야 함
2. **보안**: 네이티브 앱 파라미터 검증 필요
3. **에러 처리**: 모든 에러 케이스에서 적절한 리다이렉트 필요

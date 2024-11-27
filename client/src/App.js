// App.js

// add 함수 정의
export const add = (a, b) => a + b;

// 예시로 add 함수 사용
function App() {
  return (
    <div className="App">
      <h1>{add(1, 2)}</h1> {/* 예시로 App에서 add 함수 사용 */}
    </div>
  );
}

export default App;

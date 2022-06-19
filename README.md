# Eat Donuts!
**채소를 피해 도넛을 먹어보세요!**
- Skills: HTML/CSS, JavaScript, React, Node.js, MongoDB
- link: 

## 프로젝트 개요
**🗣 HTML의 <canvas />를 이용하여 게임을 만들어보자!**
- 귀엽고 단순하고 속도감있고 중독성있는 게임을 만들어보자!
- 랭킹 시스템을 도입해서 친구와 경쟁해보자!

Eat Donuts!는 키보드 조작으로 단순하며 속도감있는 게임입니다. 단계가 높아질수록 캐릭터의 속도는 빨라지며 피해야할 채소의 양은 늘어납니다. 

게임의 재미와 중독성을 더하기 위해 랭킹 시스템을 도입하였습니다. 이를 위해 단순 HTML과 JavaScript로만 작성되었던 게임에 Node.js(express)와 MongoDB를 추가하였습니다.

## Set
- `git clone https://github.com/seulki9802/game.git`
- `cd game`
- `npm install`
- `cd react-game`
- `npm install`
- `npm run build`
- `cd ..`
- game폴더 아래 .env 파일 생성, PORT='원하는 포트 입력' DB_RUL='mongoDB connect URL 입력'
- `node server.js`
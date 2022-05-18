window.onload = function () {
  /* 
   --------------------------------------------------------------------
   아래 코드를 다시한번 짜보기!
   - 여기서 중요한 것
   -> 카드 섞는 부분 다시 한번 짜보고(구현할 기능을 정리하며) 
   다른 방법으로도 짜보기(Math.random)
   조건, 반복과 같은 기본 구조로 짜보면서, 내장함수로 짤볼때 
   필요한 내장함수를 검색하여, 여러 방법으로 구현해보는 연습!

   (여기서 중요한 개념)
   이미지섞기 => Math.random()/round(), Arrays.includes() 실습  
   ---------------------------------------------------------------------

   [구조 분석]
   **/

  //재시작
  let getReStart = function () {
    window.location.reload();
  };

  let btn_reStart = this.document.getElementById('restart');
  btn_reStart.addEventListener('click', getReStart);

  //--

  let imgContainer = document.querySelector('.img-Container');
  let imgArr = [
    'img2/c1.png',
    'img2/f2.png',
    'img2/h1.png',
    'img2/m1.png',
    'img2/m2.png',
    'img2/c1.png',
    'img2/07.png',
    'img2/f1.png',
    'img2/f2.png',
    'img2/h1.png',
    'img2/m1.png',
    'img2/m2.png',
    'img2/m3.png',
    'img2/07.png',
    'img2/m3.png',
    'img2/f1.png',
  ];
  //---

  /* [이미지섞기] */

  //이전값이 존재하는 지 검사
  function find(sample, find) {
    //includes()를 만들어보자!
    // let sample= [3,6,5];
    // let find = 3;
    let result = false;
    for (let i = 0; i < sample.length; i++) {
      if (sample[i] === find) {
        result = true; //존재하면 true
      }
    }
    return result;
  }
  //--

  //랜덤으로 인덱스 추출
  let nl = [];
  for (let i = 0; true; i++) {
    let r = Math.random();
    let v = r * (imgArr.length - 1);
    let r2 = Math.round(v);
    // if(nl.includes(r2) === false) {
    if (find(nl, r2) === false) {
      nl.push(r2);
    }
    if (nl.length === imgArr.length) {
      break;
    }
  }
  //--랜덤으로 인덱스 추출

  // 이미지 썩기위한 랜덤인덱스 부여
  let suffled_list = [];
  for (let i = 0; i < nl.length; i++) {
    let idx_number = nl[i];
    let img_addr = imgArr[idx_number];
    suffled_list.push(img_addr);
  }

  imgArr = suffled_list; //이렇게 해주면 랜덤으로 이미지 출력
  this.console.log(imgArr);
  this.console.log(suffled_list);
  //---

  /* 이미지 뒤집기 */
  function turn(id, o) {
    let div = document.querySelector('#' + id);
    let open = div.querySelector('#open');
    let close = div.querySelector('#close');
    if (o) {
      open.style.display = 'inline';
      close.style.display = 'none';
    } else {
      open.style.display = 'none';
      close.style.display = 'inline';
    }
  }

  //이미지 열린상태
  let open_state = {
    first_click: '',
    second_click: '',
  };

  for (let i = 0; i < imgArr.length; i++) {
    let div = document.createElement('div');
    div.style.cursor = 'pointer';
    div.className = 'contents';
    div.id = 'img' + i; //img요소에 id부여

    imgContainer.appendChild(div);

    let img1 = this.document.createElement('img');
    img1.src = './img/none.png';
    img1.style.display = 'inline';
    img1.id = 'close';

    let img2 = this.document.createElement('img');
    img2.src = imgArr[i];
    img2.style.display = 'none';
    img2.id = 'open';

    div.appendChild(img1);
    div.appendChild(img2);

    function geticon(id) {
      return document.getElementById(id);
    }

    //초기에 이미지 보여주다 뒤집기
    turn('img' + i, true);
    setTimeout(function () {
      turn('img' + i, false);
    }, 3000);

    div.addEventListener('click', function (e) {
      if (div.solved !== true) {
        if (open_state.first_click === '') {
          open_state.first_click = 'img' + i; //첫번째 클릭상태(클릭한 이미지) 담기
          turn('img' + i, true);
        } else {
          if (open_state.first_click !== 'img' + i) {
            //첫번째 클릭한게 아니라면 다음코드실행
            open_state.second_click = 'img' + i; //두번째 클릭상태(클릭한 이미지) 담기

            //첫번째, 두번째 클릭한 이미지 경로 담기
            let first_img = document.querySelector(
              '#' + open_state.first_click + ' > #open',
            ).src;
            let second_img = document.querySelector(
              '#' + open_state.second_click + ' > #open',
            ).src;

            //클릭한 이미지 비교
            if (first_img === second_img) {
              console.log('correct');
              turn('img' + i, true);

              //이미지같은거 찾았으면 이미지 감싼 부모요소[div(.contents)]에
              //solved 속성 동적으로 추가
              geticon(open_state.first_click).solved = true;
              geticon(open_state.second_click).solved = true;
            } else {
              console.log('wrong', first_img, second_img);
              turn(open_state.first_click, false);
              turn(open_state.second_click, false);
            }
            open_state.first_click = '';
            open_state.second_click = '';
            // }
          } else {
            console.log('같은거 누르지마세요');
          }
        }
      } else {
        console.log('이미 끝난거 눌렀다');
      }
    });
  }


//----

const gameStart = document.querySelector('.game-start');
const container = document.querySelector('.container')

gameStart.addEventListener('click', (e) => {
  e.target.classList.add('hiddren');
  container.style.display = 'block';
})




  /*
   [필요사항] 
     : 필요사항(= 기획)을 정해서 하나씩 구현해보는 것이 나중에 프로젝트할 때도 중요(기획 => 설계 => 분석)
  
     - 이미지를 랜덤으로 보여주기
    1) 이미지 배열의 인덱스를 랜덤으로 출력해주는 기능 구현(여기서는 이게 중요!) 
        - 랜덤으로 출력된 인덱스 값을 배열로 담기
        - 배열로 담기전 검사(랜덤으로 값이 들어오기 때문에, 같은 값은 제거)
        - 그 배열을 이미지 배열에 부여(항상 새로운 값은 새 변수/배열/객체에....) 

     - 이미지 클릭 이벤트처리    
    2) DOM이미지객체 생성후 
        - 이미지 뒤집기(처음에 이미지를 보여주고 감추기) 
        - 이미지 클릭 이벤트처리
          → 첫번째 클릭, 두번째 클릭 비교하여 맞는지 검사
          → 이미 클릭한 이미지 이벤트처리
          → 일치하면 이미지 뒤집기

*/
};

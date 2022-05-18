window.onload = function () {
  // 최종완성본(구조 이쁘게 정리)
  let getReStart = function () {
    window.location.reload();
  };

  let btn_reStart = this.document.getElementById('restart');
  btn_reStart.style.width = '200px';
  btn_reStart.style.height = '100px';
  btn_reStart.style.borderRadius = '20%';
  btn_reStart.style.fontSize = '20px';
  btn_reStart.style.background = 'black';
  btn_reStart.style.color = '#fff';
  btn_reStart.addEventListener('click', getReStart);

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

  //이전값이 존재하는 지 검사
  function find(sample, find) {
    let result = false;
    for (let i = 0; i < sample.length; i++) {
      if (sample[i] === find) {
        result = true; //존재하면 true
      }
    }
    return result;
  }
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

  let suffled_list = [];
  for (let i = 0; i < nl.length; i++) {
    let idx_number = nl[i];
    let img_addr = imgArr[idx_number];
    suffled_list.push(img_addr);
  }
  //---

  imgArr = suffled_list;
  // console.log(imgArr);
  // console.log(suffled_list);

  let wrap = document.getElementById('wrap');
  wrap.style.width = '1200px';

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

  //마우스클릭 상태체크
  let open_state = {
    first_click: '',
    second_click: '',
  };

  for (let i = 0; i < imgArr.length; i++) {
    let div = document.createElement('div');
    div.style.cursor = 'pointer';
    div.className = 'contents';
    div.id = 'img' + i;

    wrap.appendChild(div);

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

    // 이미지 뒤집기
    function geticon(id) {
      return document.getElementById(id);
    }
    turn('img' + i, true);
    this.setTimeout(function () {
      turn('img' + i, false);
    }, 2000);

    //클릭이벤트 생성 및 메인로직구현
    div.addEventListener('click', function (e) {
      if (div.solved !== true) {
        if (open_state.first_click === '') {
          open_state.first_click = 'img' + i;
          turn('img' + i, true);
        } else {
          if (open_state.first_click !== 'img' + i) {
            open_state.second_click = 'img' + i;
            let first_img = document.querySelector(
              '#' + open_state.first_click + ' > #open',
            ).src;
            let second_img = document.querySelector(
              '#' + open_state.second_click + ' > #open',
            ).src;
            if (first_img === second_img) {
              console.log('correct');
              turn('img' + i, true);
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
};

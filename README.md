## aheui.user.js
### 이게 뭡니까?
제오백칠십오돌 한글날 겸 아희반포 제십칠돌을 기념하여 새벽에 이유없이 만든 사용자글판때기입니다.
Puzzlet Chung이 개발한 [jsaheui](https://github.com/aheui/jsaheui) 구현체를 그냥 가져오기만 해서 모든 누리집의 정보통신망용표준글판때기 관제실에서 사용할 수 있도록 하였습니다. 물론 문제잡기 관제실과 단계별 실행과 같은 고급 기능은 제공하지 않습니다.

### 어떻게 쓰나요?
정보통신망용표준글판때기 관제실에서 다음과 같은 구문을 사용합니다.
```js
아희(글판때기, 입력 완충기, 줄바꿈 기다림 여부, 숫자 완충기);
```

글판때기는 줄바꿈(\n)으로 구분된 문자열이여야 하며, 입력 완충기는 문자열, 줄바꿈 기다림 여부는 참/거짓형, 숫자 완충기는 숫자들의 배열 또는 공백으로 구분된 문자열([aheui.github.io#12](https://github.com/aheui/aheui.github.io/issues/12#issue-128381350) 참조)로 입력이 가능합니다.

줄바꿈 기다림 여부에 `참(true)`이 입력될 경우, 줄바꿈(\n)이 올 때까지 완충기에 쌓아뒀다가 줄바꿈(\n) 지점에서 한번에 출력하거나 글판때기가 종료할 때 일괄적으로 출력합니다. 예시는 다음과 같습니다.
```js
> 아희(`밤밣따빠밣밟따뿌
빠맣파빨받밤뚜뭏
돋밬탕빠맣붏두붇
볻뫃박발뚷투뭏붖
뫃도뫃희멓뭏뭏붘
뫃봌토범더벌뿌뚜
뽑뽀멓멓더벓뻐뚠
뽀덩벐멓뻐덕더벅`, "", false);
H
e
l
l
o
...
```
도저히 봐줄 수가 없습니다.

```js
> 아희(`밤밣따빠밣밟따뿌
빠맣파빨받밤뚜뭏
돋밬탕빠맣붏두붇
볻뫃박발뚷투뭏붖
뫃도뫃희멓뭏뭏붘
뫃봌토범더벌뿌뚜
뽑뽀멓멓더벓뻐뚠
뽀덩벐멓뻐덕더벅`, "", true);
안녕, 세상!
```
훨씬 낫군요.

### 왜 쓰나요?
어떤 문자의 난놈다쓴다원천글 글판때기를 구하고 싶을때 습관적으로 정보통신망용표준글판때기 관제실을 이용해서 찾고는 합니다.
```js
"뷁".charCodeAt(0);
```
그런데 말입니다. 혹시 너무 길어서 불편하다는 생각은 해보시지 않으셨습니까? 난놈다쓴다원천글 글판때기를 구하는데는 밯망희보다 우수한 글판때기는 없다는 사실이 증명되었다고 합니다.[#](https://github.com/aheui/aheui.github.io/blob/9335cb622be4587826117514dfc1739d4a321b6a/aheuicon.html#L123)

이에 밯망희 깎던 노인의 마음을 정보통신망용표준글판때기 관제실에 부여할 수는 없나 고민하던 차, 아래와 같은 글판때기를 고안하였습니다.
```js
아희("밯망희","뷁");
```

비록 정보통신망용표준글판때기 문법과 매개변수로 인하여 밯망희 깎던 노인의 마음을 그대로 전하지는 못하였으나, 전자는 18자, 후자는 14자로서 무려 4자의 감량 효과가 있었습니다. 어째 후자가 글자무게의수가 더 길다고요? 기분 탓입니다. 무시하십시오.

### 어떻게 설치하나요?
1. Greasemonkey 호환 사용자가 손질한 글판때기 관리체계를 설치합니다. (Chrome 기준 [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) 등)
1. [이 접속주소](https://github.com/ldmsys/aheui.user.js/raw/master/jsaheui.user.js)에 접속하여 설치합니다.

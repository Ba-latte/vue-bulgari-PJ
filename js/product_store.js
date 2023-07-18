// 뷰엑스 스토어 : 제품리스트 페이지 뷰 데이터 저장소 JS  - product_store.js


// 제품 데이터 JS 가져오기
import goods_total_list from "./data/goods-total.js";

///////////////////////////// [ 뷰엑스 스토어를 활용한 변수 세팅하기 ] /////////////////////////////
const store = new Vuex.Store({
    // [ 데이터 세팅 구역 ]
    state:{
        // 제품 데이터를 담은 변수
        items: goods_total_list,

        // 공통 처리 idx변수 (⭐유일키)
        idx:"",

        // 공통 처리 제품명 변수
        name:"",
        // 공통 처리 가격 변수
        price:"",
        // 공통 처리 카테고리명 변수
        cat:"",
        // 공통 처리 갯수 변수
        cnt:"",
        // 공통 처리 소재 변수
        material:"",
        // 공통 처리 젬스톤 변수
        gemstone:"",

        // 공통 처리 이름뒤의숫자 변수
        number:"",

        // 필터 데이터용 배열 변수 만들기 : 체크/언체크 확인->t/f가 이 배열안에 들어감
        chkarr:[true, true, true, true],
        // 👉맨처음에 모든 제품 다 보이게 하기 위해선 전부다 보이게 true로 해두기
        // 필터 데이터용 배열 입력값 변수 : 이 값이 v-if문 안에 들어감
        selnm:["", "", "", ""],

        // 필터링용 배열 변수 : 체크/언체크 확인 -> t/f가 이 배열안에 들어감(모든 재질 다 보이게 true로 해두기)
        material_chk:[true, true, true],
        // 필터링용 배열입력값 변수 : 이 값이 v-if문 안에 들어감
        material_sel:["","",""],
    },

    // [ 데이터 변경 메서드 구역 ] : 여기에 있는 것 호출 시 commit()사용하기
    mutations:{
        // 데이터 셋업하는 메서드
        setData(st, pm){
            // // 유일키 가져오기
            // st.idx = pm.idx;

            // 카테고리명 바꾸기
            st.cat = pm;
            console.log("카테고리는? : ", pm);

            // 전체 갯수 세기
            // console.log("전체 길이는?", st.items.length);
            st.cnt = st.items.filter(function(x){
                return x.category == pm
            }).length
            console.log(pm, " 의 총 개수는? : ", st.cnt);

        },
        // 최초 화면 셋업 메서드
        initData(st, pm){
            console.log("최초화면!", pm);
            if(pm === "jewellery"){
                // this.commit("setData", "rings");
                
            }
            
        },
        // 가격 3자리마다 콤마 붙이는 정규식 메서드
        insComma(st, x) {
            console.log("3자리마다 콤마 붙여라!!", x);
            // 만약 x가 비어있으면 아무런 처리 없이 리턴하고, x에 값이 있다면 정규식으로 표현하기
            if(!x) return;
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        
        // 이름뒤에 붙은 숫자로 for문 제어해보기 위한 메서드ㅠㅠ
        chgFn(st, x){
            st.items.forEach((v,i)=>{
                let name = v.ginfo[0];
                // 이름에서 뒤의 숫자만 잘라내서 가져오기
                let number = name.substring(10);
                // console.log("이름뒤의 숫자!!: ", number);

                st.number = number;
            });
            
        },

        // 체크박스 체크시 처리메서드
        resCheck(dt){
            console.log("체크: ", dt.chkarr);
            // 3개의 체크박스 상태배열 변수값에 따라 실제 조건에 들어갈 cat명을 넣어준다!
            dt.chkarr.forEach((v,i)=>{
                // v-배열값인 true/false값이 들어옴
                if(v){
                    // 체크박스 체크된 경우

                    dt.selnm[i] = i==0?"rings":i==1?"necklaces":i==2?"bracelets":"earrings";
                    // 중첩 삼항연산자 사용
                } ////////////// if : 체크박스 체크된 경우 //////////////////
                else{
                    // 체크박스 체크 안 된 경우
                    // 무조건 빈 값을 할당해야함
                    dt.selnm[i] = "";
                } ///////////// else : 체크박스 체크 안 된 경우 //////////////////
            });
        }, //////////////////// resCheck 메서드 //////////////////////////

        // 소재 체크박스 체크시 처리하는 메서드
        checkFn(st){
            console.log("체크박스 상태!!: ", st.material_chk);
            // 3개의 체크박스 상태배열 변수값에 따라서 실제 조건에 들어갈 material명 넣어주기
            st.material_chk.forEach((v,i)=>{
                // v에는 배열값인 true/false가 들어옴
                if(v){
                    st.material_sel[i] = i==0?"pink-gold":i==1?"yellow-gold":"white-gold";
                } //////////////// if : 체크박스가 체크된 경우 ///////////////////
                else{
                    // 체크박스 체크 안 된 경우는 무조건 빈 값을 할당해야 함
                    st.material_sel[i] = "";
                } /////////////// else : 체크박스에 체크가 안 된 경우 /////////////////////
            console.log("체크박스 상태!!: ", st.material_sel);
            }); ///////////// forEach ////////////////
        },

        // 이름 바꾸기 위한 메서드
        chgTit(x){
            let temp="";
            switch(x){
                case 'rings': temp='반지'; break;
                case 'necklaces': temp='목걸이'; break;
                case 'bracelets': temp='팔찌'; break;
                case 'earrings': temp='귀걸이'; break;
            }
            return temp;
        },

        // 제품 리스트의 imgbx태그 클릭시 제품 상세설명 박스 팝업하는 메서드
        openFn(st, pm){
            $(".pd_detail_bx").fadeIn();
            
            // 가져온 pm에서 공통처리 인덱스번호 업데이트하기!
            st.idx = pm.idx;
            
            // 가져온 pm에서 공통처리 카테고리명 업데이트하기!
            st.cat = st.items[pm-1].category;

            // 가져온 pm에서 공통처리 카테고리명 업데이트하기!
            st.name = st.items[pm-1].ginfo[0];

            // 가져온 pm에서 공통처리 소재명 업데이트하기!
            st.material = st.items[pm-1].material;

            // 가져온 pm에서 공통처리 소재명 업데이트하기!
            st.gemstone = st.items[pm-1].gemstone;

            // 가져온 pm에서 공통처리 가격 업데이트하기!
            st.price = st.items[pm-1].ginfo[1];

            console.log("상세 설명 박스 오픈!!", st.price);
        },

        // 제품 상세페이지 닫기 버튼 클릭시 닫히는 메서드
        closeFn(){
            console.log("닫기 아이콘 클릭!");
            $(".pd_detail_bx").fadeOut();
        },
    },


});


// 내보내기
export default store;
window.addEventListener("load", function(){
	let topPos=0;
	lenisAnimation();

	setTimeout(function(){
		gsap.to(window, { scrollTo: 0, duration: 0.5 });
	}, 200);

	let tabList=document.querySelector(".tab");
	let desktop=document.getElementById("desktop");
	let desktopList=desktop.querySelectorAll("ul > li"); 
	let gnb=document.querySelector("#gnb");
	let gnbList=gnb.querySelectorAll("ul > li");
	let navigation=document.querySelector("#navigation");
	let navigationList=navigation.querySelectorAll("ul > li")

	let page=document.querySelectorAll("section");
	let pageList=[header];	

	page.forEach(function(item){
		pageList.push(item);
	})

	tabList.addEventListener("click", function(e){
		e.preventDefault();
		
		if(tabList.classList.contains("active") == false){
			tabList.classList.add("active");
			gnb.classList.add("open");
		}
		else{
			tabList.classList.remove("active");
			gnb.classList.remove("open");
		}

	});	

	window.addEventListener("scroll", function() {
		// 페이지 리스트의 각 요소들에 대해 위치를 확인
		pageList.forEach(function(page, i) {
			// 페이지가 화면에 보이는지 확인
			if (isPageInView(page)) {
			navigationList.forEach(function(item, j) {
				if (i === j) {
				item.classList.add("on");
				} else {
				item.classList.remove("on");
				}
			});
			}
		});
	});
	
	// 페이지가 화면에 보이는지 체크하는 함수
	function isPageInView(page) {
	// 페이지의 위치와 크기를 가져오고, 그 위치가 현재 화면에 보이는지 체크
	const rect = page.getBoundingClientRect();
	const windowHeight = window.innerHeight || document.documentElement.clientHeight;
	
	// 페이지의 상단이 화면에 보이는지, 하단이 화면을 벗어나지 않았는지 확인
	return rect.top >= 0 && rect.top <= windowHeight;
	}
	  

	desktopList.forEach(function(item, i){
		desktopList[i].addEventListener("click", function(e){
			e.preventDefault();
		
			controlMenu(i)
			gsap.to(window, { scrollTo: topPos, duration: 0.7});
		});

		gnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			controlMenu(i)
			gsap.to(window, { scrollTo: topPos, duration: 0.4, onComplete: function(){   //onComplete 이동하면 모바일 메뉴 닫게  
				tabList.classList.remove("active");
				gnb.classList.remove("open");
			} });
		});

		navigationList[i].addEventListener("click", function(e){
			e.preventDefault();
			n=i;
			controlMenu(i)
			gsap.to(window, { scrollTo: topPos, duration: 0.7, onComplete: function(){
				navigationList.forEach(function(item, i){
					if( n == i){
						navigationList[i].classList.add("on");
					}
					else{
						navigationList[i].classList.remove("on");
					}
				})
			}});
		})
	});

	function controlMenu(i){
		if(i !== 3){
			topPos=pageList[i].offsetTop;
		}
		else{
			gsap.matchMedia().add("(min-width: 769px)", function(){
				topPos=pageList[i-1].offsetTop+pageList[i-1].getBoundingClientRect().height+window.innerHeight;
			});

			gsap.matchMedia().add("(max-width: 770px)", function(){
				topPos=pageList[i-1].offsetTop+pageList[i-1].getBoundingClientRect().height-(window.innerHeight/5);
			});
		}
	}


	let track = document.querySelector(".track");
	let trackText = track.firstElementChild;
	let clone = trackText.cloneNode(true); 
	track.appendChild(clone);

	gsap.to(track, {
		x: -trackText.clientWidth,  
		duration: 35, 
		repeat: -1, 
		ease: "none", 
	});

	gsap.timeline({
		scrollTrigger: {
			trigger: "#introduce",
			scrub: 1,
			start: "top 40%",
			onEnter: function(){
				document.body.classList.add("white");
			},
			onLeaveBack: function(){
				document.body.classList.remove("white");
			}
		}
	});


	function yMoving(element, container, amount, angle=0){
		gsap.to(element, {
			yPercent: amount,
			rotation: angle,
			ease: "none",
			scrollTrigger: {
				trigger: container,
				start: "top bottom",
				end: "bottom center",
				scrub: 1
			}
		});
	}

	let mainTitle=document.querySelector(".main_text");
	let helloTxt=mainTitle.querySelector(".hello");
	let helloLine=mainTitle.querySelector(".line");
	let linew;
	let lineDrawing=false;

	function resizeFn(){
		let totalw=mainTitle.offsetWidth;
		let hellow=helloTxt.offsetWidth;
		let gap=helloTxt.offsetWidth+25;
		linew=mainTitle.offsetWidth-helloTxt.offsetWidth-25;

		helloLine.style.left=gap+"px";

		if(lineDrawing) helloLine.style.width=linew+"px";
	}

	resizeFn();

	window.addEventListener("resize", resizeFn);

	const mainTl=gsap.timeline();

	mainTl.fromTo(".v_tit .subject", { y: 15, opacity: 0 }, { y: 0, opacity: 1 })
	.fromTo(".v_tit .line_wrap", { y: 15, opacity: 0 }, { y: 0, opacity: 1 })
	.fromTo(".v_tit .developer", { y: 15, opacity: 0 }, { y: 0, opacity: 1, onComplete: function(){
		gsap.to(helloLine, { width: linew, duration: 0.75 });
		lineDrawing=true;
	}});

	gsap.set(".cluster", { yPercent: 5 });
	gsap.set(".triangle", { yPercent: 25, rotation: -90 });
	gsap.set(".caption", { yPercent: -20 });
	gsap.set(".dots-element", { yPercent: 15 });

	yMoving(".cluster", ".cluster", -5);
	yMoving(".triangle", ".cluster", -5, 40);
	yMoving(".caption", ".cluster", 20);
	yMoving(".dots-element", ".cluster", -10);

	function separateWord(element){
		let inputString=element.innerText;
		element.innerText="";

		let word=inputString.split("");

		word.forEach(function(word){
			let div=document.createElement("div");
			div.innerText=word == " " ? "\u00A0" : word;
			element.appendChild(div);
		});
	}

	let title1=document.querySelector(".section_title .part1");
	let title2=document.querySelector(".section_title .part2");

	separateWord(title1);
	separateWord(title2);

	const textTl=gsap.timeline();

	let chars=document.querySelectorAll(".section_title div[class^=part] div");

	textTl.from(chars, {
		y: 10,
		opacity: 0,
		duration: 0.8,
		stagger: 0.02,
		scrollTrigger: {
			trigger: ".section_title", 
			start: "top 75%", 
			end: "bottom center", 
			scrub: 1 
		},
	});

	const skillsTl=gsap.timeline({
		scrollTrigger: {
			trigger: "#skills",
			start: "top 40%",
			end: "bottom 20%",    
			toggleActions: "play none play reverse" 
		}
	});

	skillsTl.from(".skills_list li", { y: 40, opacity: 0, duration: 0.4, stagger: 0.4 });

	new Swiper(".updateSwiper", {
		slidesPerView: 1,
		centeredSlides: true,
		spaceBetween: 10,
		breakpoints: {
			768: {
				spaceBetween: 0,
				pagination: {
					el: ".updateSwiper .swiper-pagination",
					type: "fraction"
				},
				navigation: {
					prevEl: ".updateSwiper .swiper-button-prev",
					nextEl: ".updateSwiper .swiper-button-next"
				}
			}
		}
	});

	document.body.style.transition = 'background-color 1s ease-in-out';

	let mediaQuery=gsap.matchMedia();

	mediaQuery.add("(min-width: 769px)", function(){ // desktop
		let deviceHeight=window.innerHeight;
		let contentsHeight=document.querySelector("#skills").offsetHeight;
		let deviceWidth=window.innerWidth;

		const updateTl=gsap.timeline({
			scrollTrigger: {
				trigger: "#update",
				scrub: true,
				pin: true,
				start: "top top",
				end: "+="+1200
			}
		});

		updateTl.to(".update_top", {
			x: deviceWidth >= 1920 ? 414 : (deviceWidth >= 1024 ? 265 : 90)
		}, "ontime1");

		updateTl.to(".update_bottom", {
			x: deviceWidth >= 1920 ? -414 : (deviceWidth >= 1024 ? -265 : -90)
		}, "ontime1");

		updateTl.to(".update_top", { y: -194 }, "ontime2");

		updateTl.to(".update_bottom", { y: 206 }, "ontime2");

		updateTl.to(".updateSwiper", { display: "block", height: 400 }, "ontime2");

		updateTl.to(".update_btn", { display: "block", opacity: 1});
	});

	const prdSwiper=new Swiper("#openSource .swiper", {
		loop: true,
		speed: 2000,
		slidesPerView: 1.5,
		centeredSlides: true,
		spaceBetween: 15,
		pin: true,
		autoplay: {
			delay: 1500
		},
		breakpoints: {
			769: {
				slidesPerView: 2.5,
				spaceBetween: 15
			},
			1025: {
				slidesPerView: 3.5,
				spaceBetween: 20
			}
		}
	});

	const swiperContainer = document.querySelector('#openSource .swiper');


	swiperContainer.addEventListener('mouseenter', () => {
		prdSwiper.autoplay.stop(); 

	});

	swiperContainer.addEventListener('mouseleave', () => {
		prdSwiper.autoplay.start(); 
	});


    let topButton = document.getElementById("top");
    window.addEventListener('scroll', function() {
        var t = window.scrollY;
        if (t > 100) {
            topButton.style.display = 'block';
            topButton.style.transition = 'display 0.3s';
        } else {
            topButton.style.display = 'none';
        }
    });

    topButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
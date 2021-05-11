(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{79:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return a})),t.d(n,"toc",(function(){return d})),t.d(n,"default",(function(){return u}));var r=t(3),i=t(7),c=(t(0),t(98)),o={id:"nvdec",title:"nVidia hardware decoder"},a={unversionedId:"configuration/nvdec",id:"configuration/nvdec",isDocsHomePage:!1,title:"nVidia hardware decoder",description:"Certain nvidia cards include a hardware decoder, which can greatly improve the",source:"@site/docs/configuration/nvdec.md",slug:"/configuration/nvdec",permalink:"/frigate/configuration/nvdec",editUrl:"https://github.com/blakeblackshear/frigate/edit/master/docs/docs/configuration/nvdec.md",version:"current"},d=[{value:"Docker setup",id:"docker-setup",children:[{value:"Requirements",id:"requirements",children:[]},{value:"Setting up docker-compose",id:"setting-up-docker-compose",children:[]},{value:"Setting up the configuration file",id:"setting-up-the-configuration-file",children:[]}]}],p={toc:d};function u(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Certain nvidia cards include a hardware decoder, which can greatly improve the\nperformance of video decoding. In order to use NVDEC, a special build of\nffmpeg with NVDEC support is required. The special docker architecture 'amd64nvidia'\nincludes this support for amd64 platforms. An aarch64 for the Jetson, which\nalso includes NVDEC may be added in the future."),Object(c.b)("h2",{id:"docker-setup"},"Docker setup"),Object(c.b)("h3",{id:"requirements"},"Requirements"),Object(c.b)("p",null,Object(c.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.nvidia.com/en-us/drivers/unix/"}),"nVidia closed source driver")," required to access NVDEC.\n",Object(c.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/NVIDIA/nvidia-docker"}),"nvidia-docker")," required to pass NVDEC to docker."),Object(c.b)("h3",{id:"setting-up-docker-compose"},"Setting up docker-compose"),Object(c.b)("p",null,"In order to pass NVDEC, the docker engine must be set to ",Object(c.b)("inlineCode",{parentName:"p"},"nvidia")," and the environment variables\n",Object(c.b)("inlineCode",{parentName:"p"},"NVIDIA_VISIBLE_DEVICES=all")," and ",Object(c.b)("inlineCode",{parentName:"p"},"NVIDIA_DRIVER_CAPABILITIES=compute,utility,video")," must be set."),Object(c.b)("p",null,"In a docker compose file, these lines need to be set:"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{}),"services:\n  frigate:\n    ...\n    image: blakeblackshear/frigate:stable-amd64nvidia\n    runtime: nvidia\n    environment:\n      - NVIDIA_VISIBLE_DEVICES=all\n      - NVIDIA_DRIVER_CAPABILITIES=compute,utility,video\n")),Object(c.b)("h3",{id:"setting-up-the-configuration-file"},"Setting up the configuration file"),Object(c.b)("p",null,"In your frigate config.yml, you'll need to set ffmpeg to use the hardware decoder.\nThe decoder you choose will depend on the input video."),Object(c.b)("p",null,"A list of supported codecs (you can use ",Object(c.b)("inlineCode",{parentName:"p"},"ffmpeg -decoders | grep cuvid")," in the container to get a list)"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{})," V..... h263_cuvid           Nvidia CUVID H263 decoder (codec h263)\n V..... h264_cuvid           Nvidia CUVID H264 decoder (codec h264)\n V..... hevc_cuvid           Nvidia CUVID HEVC decoder (codec hevc)\n V..... mjpeg_cuvid          Nvidia CUVID MJPEG decoder (codec mjpeg)\n V..... mpeg1_cuvid          Nvidia CUVID MPEG1VIDEO decoder (codec mpeg1video)\n V..... mpeg2_cuvid          Nvidia CUVID MPEG2VIDEO decoder (codec mpeg2video)\n V..... mpeg4_cuvid          Nvidia CUVID MPEG4 decoder (codec mpeg4)\n V..... vc1_cuvid            Nvidia CUVID VC1 decoder (codec vc1)\n V..... vp8_cuvid            Nvidia CUVID VP8 decoder (codec vp8)\n V..... vp9_cuvid            Nvidia CUVID VP9 decoder (codec vp9)\n")),Object(c.b)("p",null,"For example, for H265 video (hevc), you'll select ",Object(c.b)("inlineCode",{parentName:"p"},"hevc_cuvid"),". Add\n",Object(c.b)("inlineCode",{parentName:"p"},"-c:v hevc_covid")," to your ffmpeg input arguments:"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{}),"ffmpeg:\n  input_args:\n    ...\n    - -c:v\n    - hevc_cuvid\n")),Object(c.b)("p",null,"If everything is working correctly, you should see a significant improvement in performance.\nVerify that hardware decoding is working by running ",Object(c.b)("inlineCode",{parentName:"p"},"nvidia-smi"),", which should show the ffmpeg\nprocesses:"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{}),"+-----------------------------------------------------------------------------+\n| NVIDIA-SMI 455.38       Driver Version: 455.38       CUDA Version: 11.1     |\n|-------------------------------+----------------------+----------------------+\n| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |\n| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |\n|                               |                      |               MIG M. |\n|===============================+======================+======================|\n|   0  GeForce GTX 166...  Off  | 00000000:03:00.0 Off |                  N/A |\n| 38%   41C    P2    36W / 125W |   2082MiB /  5942MiB |      5%      Default |\n|                               |                      |                  N/A |\n+-------------------------------+----------------------+----------------------+\n\n+-----------------------------------------------------------------------------+\n| Processes:                                                                  |\n|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |\n|        ID   ID                                                   Usage      |\n|=============================================================================|\n|    0   N/A  N/A     12737      C   ffmpeg                            249MiB |\n|    0   N/A  N/A     12751      C   ffmpeg                            249MiB |\n|    0   N/A  N/A     12772      C   ffmpeg                            249MiB |\n|    0   N/A  N/A     12775      C   ffmpeg                            249MiB |\n|    0   N/A  N/A     12800      C   ffmpeg                            249MiB |\n|    0   N/A  N/A     12811      C   ffmpeg                            417MiB |\n|    0   N/A  N/A     12827      C   ffmpeg                            417MiB |\n+-----------------------------------------------------------------------------+\n")),Object(c.b)("p",null,"To further improve performance, you can set ffmpeg to skip frames in the output,\nusing the fps filter:"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{}),"  output_args:\n    - -filter:v\n    - fps=fps=5\n")),Object(c.b)("p",null,"This setting, for example, allows Frigate to consume my 10-15fps camera streams on\nmy relatively low powered Haswell machine with relatively low cpu usage."))}u.isMDXComponent=!0},98:function(e,n,t){"use strict";t.d(n,"a",(function(){return l})),t.d(n,"b",(function(){return m}));var r=t(0),i=t.n(r);function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=i.a.createContext({}),u=function(e){var n=i.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=u(e.components);return i.a.createElement(p.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},f=i.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,c=e.originalType,o=e.parentName,p=d(e,["components","mdxType","originalType","parentName"]),l=u(t),f=r,m=l["".concat(o,".").concat(f)]||l[f]||s[f]||c;return t?i.a.createElement(m,a(a({ref:n},p),{},{components:t})):i.a.createElement(m,a({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var c=t.length,o=new Array(c);o[0]=f;var a={};for(var d in n)hasOwnProperty.call(n,d)&&(a[d]=n[d]);a.originalType=e,a.mdxType="string"==typeof e?e:r,o[1]=a;for(var p=2;p<c;p++)o[p]=t[p];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"}}]);
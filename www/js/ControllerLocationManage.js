app.controller('LocationManageController', ['$scope', '$state', '$ionicActionSheet', '$ionicLoading', '$compile', '$timeout', '$cordovaGeolocation', '$cordovaSpinnerDialog', '$ionicPlatform', '$rootScope', '$stateParams', function($scope, $state, $ionicActionSheet, $ionicLoading, $compile, $timeout, $cordovaGeolocation, $cordovaSpinnerDialog, $ionicPlatform, $rootScope, $stateParams) {



  var root = $rootScope.uidRef;
  $scope.key_edit = $stateParams.edit;
  $scope.key_id = $stateParams.id;
  $scope.key_add = $stateParams.add;

  var timeKey = new Date().getTime();
  var locationChild = root.child('location');



  $timeout(function() {
          $scope.isExpanded = false;

    }, 300);



/*========================================= ฟังก์ชั่นหาตำแหน่งปัจจุบันในแผนที่ google map================================================*/

$scope.getMapLocation = function() {

  $ionicPlatform.ready(function() {
     /*======================== กำหนดการตั้งค่าการระบุตำแหน่ง ==================================*/
     var posOptions = {timeout: 10000, enableHighAccuracy: false};
     /*======================== กำหนดการตั้งค่าการระบุตำแหน่ง ==================================*/

     /*================ plugin เริ่มทำงานหาตำแหน่งปัจจุบันด้วยคำสั่ง getCurrentPosition ===========*/
     $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
             /* ======== เก็บค่าตำแหน่งในตัวไป =======*/
             var lat  = position.coords.latitude;
             var long = position.coords.longitude;

             /*====== เรียกฟังก์ชั่นสร้างแผนที่ โดยส่งค่าตำแหน่งไป ======*/
             $scope.getMap(lat, long);
    }, function(err) {
       $cordovaSpinnerDialog.hide(); /*====== ซ่อน loading ======*/
       console.log(err);

       /*=========== เช็คว่ามี plugin Native settings หรือไม่ ==========*/
       if(typeof cordova.plugins.settings.openSetting != undefined){
           /*============== ถ้ามีก็เรียกใช้ ให้เปิดหน้าตั้งค่าที่ต้องการ ===========*/
           cordova.plugins.settings.open(function(){
                    /*=========ถ้าเปิดหน้าตั้งค่าได้ ให้เปิด หน้าตั้งค่า location ========*/
                   cordova.plugins.settings.openSetting(
                   "location_source",
                   function(){
                       // ถ้าเปิดหน้า locaton แล้วและผู้ใช้ เปิด gps แล้วกลับมาที่ app
                       // แสดง loading อีกครั้ง และเรียกฟังก์ชั่นหาตำแหน่งใหม่อีกครั้ง
                       $cordovaSpinnerDialog.show(null,"รอสักครู่..");
                       $scope.getMapLocation();
                       console.log("opened location settings")
                   },
                   function(){/*====== เปิดหน้าตั้งคา location ไม่ได้ =========*/
                       console.log("failed to open");
                   });
                   console.log("opened settings")
               },
               function(){ /*========== ถ้าเปิดหน้าตั้งค่าไม่ได้ ================*/
                   console.log("failed to open settings")
               });

          /*============== ถ้ามีก็เรียกใช้ ให้เปิดหน้าตั้งค่าที่ต้องการ ===========*/
       }
     });

         /*================ plugin เริ่มทำงานหาตำแหน่งปัจจุบันด้วยคำสั่ง getCurrentPosition ===========*/

  });
};
/*========================================= ฟังก์ชั่นหาตำแหน่งปัจจุบันในแผนที่ google map================================================*/





/*=============== ฟังก์ชั่นสร้างแผนที่ ตัว markder และ infowindow รับค่าตำแหน่งที่ได้มา =========*/
$scope.getMap = function(latitude, longitude) {

   /*======= กำหนดให้มีการเรียกใช้ฟังก์ชั่นแสดงชื่อจากตำแหน่ง ใน google map =====*/
        var geocoder = new google.maps.Geocoder();
  /*======= กำหนดให้มีการเรียกใช้ฟังก์ชั่นแสดงชื่อจากตำแหน่ง ใน google map =====*/


    /*================= กำหนดตำแหน่งของแผนที่ จากค่าที่ส่งมา ==================*/
    var myLatLng = new google.maps.LatLng(latitude, longitude);
    /*================= กำหนดตำแหน่งของแผนที่ จากค่าที่ส่งมา ==================*/


    /*================= กำนหนด option การแสดงแผนที่ =======================*/
    var mapOption = {
        center:myLatLng,
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    /*================= กำนหนด option การแสดงแผนที่ =======================*/


    /*================= แสดงแผนที่ในตำแหน่ง div id=map ======================*/
    var map = new google.maps.Map(document.getElementById("map"),mapOption);
    /*================= แสดงแผนที่ในตำแหน่ง div id=map ======================*/


    /*================= สร้างตัวแปรสำหรับ marker เพือแสดงตำแหน่งในแผนที่ ========*/
    var marker = new google.maps.Marker({
        draggable:true,  /* ==== ลาก Marker ได้ =====*/
        position: myLatLng
    });
    /*================= สร้างตัวแปรสำหรับ marker เพือแสดงตำแหน่งในแผนที่ ========*/


    /*======================= แสดง markder ในแผนที่ ========================*/
    marker.setMap(map);
    /*======================= แสดง markder ในแผนที่ ========================*/



    /*============== สร้างตัวแปร infowindow เพื่อแสดงข้อความเมื่อคลิกที่ marker ======*/
    var infowindow = new google.maps.InfoWindow({
       disableAutoPan : true,
       content: ''
    });
    /*============== สร้างตัวแปร infowindow เพื่อแสดงข้อความเมื่อคลิกที่ marker ======*/



    /*======= กำหนด event ให้กับ markder ถ้า คลิก marker ให้เปิด infowindow ======*/
    google.maps.event.addListener(marker, "click", function(){
        var my_Point = marker.getPosition();// หาตำแหน่ง marker ที่คลิก
        getGeocode(my_Point); // เรียกฟังก์ชั่นหาชื่อตำแหน่ง
    });
    /*======= กำหนด event ให้กับ markder ถ้า คลิก marker ให้เปิด infowindow ======*/



    /* === กำหนด event ให้กับ แผนที่ ถ้าแผนที่ ไม่ได้ทำอะไรแล้ว คล้ายๆ แผนที่โหลดเสร็จแล้ว =====*/
    google.maps.event.addListenerOnce(map, 'idle', function(){
        $cordovaSpinnerDialog.hide(); // ซ่อน loading
    });
    /* === กำหนด event ให้กับ แผนที่ ถ้าแผนที่ ไม่ได้ทำอะไรแล้ว คล้ายๆ แผนที่โหลดเสร็จแล้ว =====*/



    /*===== กำหนด event ให้กับตัว map แผนท่ เมื่อมีการเลื่อนผนที่ และจุดกลากเปลี่ยน ====*/
    google.maps.event.addListener(map,'center_changed', function() {
        infowindow.close(); // ปิด infowindow
        marker.setPosition(map.getCenter()); //เปลี่ยนจำแหน่ง marker ไปตรงกลาง
        var my_Point = map.getCenter(); // หาค่าตำแหน่งตรงกลาง
        getGeocode(my_Point); // เรียกฟังก์ชั่นหาชื่อตำแหน่ง
    });
    /*===== กำหนด event ให้กับตัว map แผนท่ เมื่อมีการเลื่อนผนที่ และจุดกลากเปลี่ยน ====*/


    /*===== กำหนด event ให้กับตัว marker เมื่อเริ่มลากตัว marker ให้ทำงานอะไร ====*/
    google.maps.event.addListener(marker, 'drag', function() {
        infowindow.close(); // ปิด infowindow ไปก่อน
    });
    /*===== กำหนด event ให้กับตัว marker เมื่อเริ่มลากตัว marker ให้ทำงานอะไร ====*/


    /*===== กำหนด event ให้กับตัว marker เมื่อสิ้นสุดการลากตัว marker ให้ทำงานอะไร ====*/
    google.maps.event.addListener(marker, 'dragend', function() {
        var my_Point = marker.getPosition();  // หาตำแหน่งของตัว marker เมื่อกดลากแล้วปล่อย
        map.panTo(my_Point);  // ให้แผนที่แสดงไปที่ตัว marker
        getGeocode(my_Point); // เรียกฟังก์ชั่นหาชื่อตำแหน่ง
    });
    /*===== กำหนด event ให้กับตัว marker เมื่อสิ้นสุดการลากตัว marker ให้ทำงานอะไร ====*/



    /*======= ฟังก์ชั่นสำหรับ หาชื่อตำแหน่งในแผนที่ แล้วแสดงใน infowindow =========*/
    var getGeocode = function(my_Point){
        var contentResult = null;
        infowindow.setContent(contentResult); // กำหนดให้เป็นค่าว่างก่อน


      // นำตำแหน่ง lat,lng จากตัวแปร my_Point ที่ส่งเข้ามาไป
        geocoder.geocode({'latLng': my_Point}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) { // ถ้าพบชื่อตำแหน่ง
                if (results[1]) {
                     // จัดรูปแบบข้อความที่จะแสดง แสดงชื่อและตำแหน่ง lat,lng
                    contentResult = '<div style="text-align: center;">'
                        +results[1].formatted_address+
                        '<br />'+my_Point.lat()+','+my_Point.lng()+
                        '</div>';


                    $scope.sendLocation = function() {
                      locationChild.push({
                        key: timeKey,
                        perKey: $scope.key_id,
                        address: results[1].formatted_address,
                        lat: my_Point.lat(),
                        lng: my_Point.lng()
                      }).then(function(ref) {
                          $state.go('app.viewLocation', { id: $scope.key_id });
                      });
                    }



                }
            } else {
                // ถ้าไม่พบชื่อจากตำแหน่ง
                contentResult = 'ไม่พบตำแหน่ง';
            }
            if(contentResult){ // กำหนดข้อความใน infowindow
                infowindow.setContent(contentResult);
                infowindow.open(map,marker); // แสดง infowindow
            }
        });
    };

    /*======= ฟังก์ชั่นสำหรับ หาชื่อตำแหน่งในแผนที่ แล้วแสดงใน infowindow =========*/


    /*============ กำหนดค่าตัวแปร map เผื่อได้เรียกใช้งาน ================*/
    $scope.map = map;
    /*============ กำหนดค่าตัวแปร map เผื่อได้เรียกใช้งาน ================*/

};

/*===== จบฟังก์ชั่นสร้างแผนที่ ตัว markder และ infowindow รับค่าตำแหน่งที่ได้มา=====*/





/* ====================== ถูกเรียกใช้เมื่อเข้าหน้าแมป ==========================  */
  $scope.init = function(){
    $ionicPlatform.ready(function() { // กำหนดก่อนเรียกใช้ plugin
         $cordovaSpinnerDialog.show(null,"รอสักครู่.."); // แสดง loading
         $scope.getMapLocation(); // เรียกฟังก์ชั่นหาตำแหน่งในแผนที่ให้ทำงาน
     });
    };
/* ====================== ถูกเรียกใช้เมื่อเข้าหน้าแมป ==========================  */

}])

// $(document).ready(function() {
//     $('.inp-selc').select2({});

//     console.log(hammad)
// });
$(".js-range-slider").ionRangeSlider({
    skin: "round",
    type: "single",
    min: 0,
    max: 100,
    // hide_from_to: false,
    decorate_both: false,
});

Array.prototype.sum = function(){
    return this.reduce((a, b) => a + b, 0);
}
jQuery(document).ready(function(){
    function addCommas(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    
    
    function getVal(id){
        let opt = document.getElementById(id+'Option').value;
        let amt = +document.getElementById(id+'Amount').value.replace(/,/g, '')
        return opt=='yes'?amt:0;
    }
    $('.ci').on('input',function(){
        var id = this.id;
        let obj = {}
        var payPercentage = +$('#payPercentage').val();

        var capOption = $('#capOption').val();
        var cap = getVal('cap');
        
        var deskFees = getVal('deskFees');
        
        var tranFees = getVal('tranFees');
        var tranFeesAmount = tranFees*18;
        // console.log(cap)

        var brokeragePay = getVal('brokeragePay');

        var gciPrevYear = +$('#gciPrevYear').val().replace(/,/g, '');
        var totalTranClose = +$('#totalTranClose').val().replace(/,/g, '');


        var buyersWork = getVal('buyersWork');
        var buyersWorkTime = 60*buyersWork;

        var sellersWork = getVal('sellersWork');
        var sellersWorkTime = 30*sellersWork;
        
        var tcPay = getVal('tcPay');
        var tcPayCost = (buyersWork+sellersWork)*tcPay;
        var tcPayTime = 2*totalTranClose;
        
        var realEstate = getVal('realEstate');
        var realEstateCost = realEstate*100;
        var realEstateTime = 4;
        
        var saleSignOption = $('#saleSignOption').val();
        var saleSign = getVal('saleSign');
        var saleSignCost = (saleSignOption=="yes"? saleSign*sellersWork:0*sellersWork);
        var saleSignTime = (saleSignOption=="yes"? 0*saleSign:2*saleSign);

        var lockBoxesOption = $('#lockBoxesOption').val();
        var lockBoxes = getVal('lockBoxes');
        var lockBoxesCost = (lockBoxesOption=="yes"? lockBoxes*sellersWork:0*sellersWork);
        var lockBoxesTime = (lockBoxesOption=="yes"? 0*lockBoxes:0.5*lockBoxes);
        
        var stagingPay = +$('#stagingPay').val().replace(/,/g, '');
        var stagingAmount = +$('#stagingAmount').val().replace(/,/g, '');
        var stagingCost = stagingPay * stagingAmount;
        var stagingTime = 5*4;
        
        var photography = getVal('photography');
        var photographyCost = photography*sellersWork;
        var photographyTime = sellersWork*2;
        
        var luxuryPhotosPay = +$('#luxuryPhotosPay').val().replace(/,/g, '');
        var luxuryPhotosAdditionalPay = +$('#luxuryPhotosAdditionalPay').val().replace(/,/g, '');
        var luxuryPhotosPayCost = luxuryPhotosPay * luxuryPhotosAdditionalPay;
        var luxuryPhotosPayTime = 1*luxuryPhotosPay;
        
        var marketingMoney = getVal('marketingMoney');
        var marketingMoneyCost = marketingMoney * 12;
        var marketingMoneyTime = 12*10;
        // console.log(luxuryPhotosPayCost,luxuryPhotosPayTime)

        var businessCards = getVal('businessCards');
        var businessCardsCost = businessCards * 1;
        var businessCardsTime = 4;

        var crmPay = getVal('crmPay');
        var crmPayCost = crmPay * 12;
        var crmPayTime = 5*12;

        var printedBuyer = getVal('printedBuyer');
        var printedBuyerCost = printedBuyer * 12;
        var printedBuyerTime = 3*12;

        var clientGifts = getVal('clientGifts');
        var clientGiftsCost = clientGifts * 12;
        var clientGiftsTime = 15*12;

        var coaching = getVal('coaching');
        var coachingCost = coaching * 12;
        var coachingTime = 2*12;

        let annualCost = tcPayCost+realEstateCost+saleSignCost+lockBoxesCost+stagingCost+photographyCost+luxuryPhotosPayCost+marketingMoneyCost+businessCardsCost+crmPayCost+printedBuyerCost+clientGiftsCost+coachingCost;
        let timeSpent = buyersWorkTime+sellersWorkTime+tcPayTime+realEstateTime+saleSignTime+lockBoxesTime+stagingTime+photographyTime+luxuryPhotosPayTime+marketingMoneyTime+businessCardsTime+crmPayTime+printedBuyerTime+clientGiftsTime+coachingTime;
        let cost = cap+brokeragePay+tranFeesAmount;
        let annualCostTotal = annualCost+cost;

        let sprendingRevenuePercentage = (gciPrevYear/annualCostTotal)*0.1;
        let givingRevenuePercentage = cost/gciPrevYear * 0.1;
        let givingRevenueAmount = (buyersWork+sellersWork)*tranFees;
        let givingRevenueAmount_ = givingRevenueAmount+cap;
        let averageHours = timeSpent/48;



        // console.log(sprendingRevenuePercentage,givingRevenuePercentage,givingRevenueAmount,averageHours,givingRevenueAmount_)
        


        

        
        $('#totalAnnualCost').text('$'+addCommas(annualCostTotal.toFixed(0)));
        $('#timeSpent').text(addCommas(timeSpent.toFixed(0)));
        $('#averageHours').text(addCommas(averageHours.toFixed(0)));

        $('#sprendingRevenuePercentage').text(addCommas((sprendingRevenuePercentage*100).toFixed(2))+'%');
        

    })
    $('#payPercentage').trigger('input')
    $('#step1-btn').on('click', function(){
        $('#step1').addClass('e_hidden', function(){
        });
        $('#step2').removeClass('e_hidden');
    })
    $('#step2-btn').on('click', function(){
        $('#step2').addClass('e_hidden', function(){
        });
        $('#step1').removeClass('e_hidden');
    })
    // $('#first-toggle-btn').on('click',function(){
    //     if(this.checked){
    //         $('#home-loan-table-data table').addClass('active');
    //     }else{
    //         $('#home-loan-table-data table').removeClass('active');
    //     }
    // })
    $('.chd-hasTooltip').on('click',function(){
        // $('.chd-hasTooltip').next().removeClass('active-tooltip')
        $(this).next().toggleClass('active-tooltip')
    })
})
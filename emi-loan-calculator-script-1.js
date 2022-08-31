// Tabs
const tabBtns = document.querySelectorAll(".tabs__btn");
const tabPanes = document.getElementsByClassName("tabs__pane");

let fadeTime = 200;

function fadeOut(target) {
	target.style.opacity = 1;
	target.style.transition = `opacity ${fadeTime}ms`;
	target.style.opacity = 0;
	setTimeout(() => {
		target.style.display = "none";
	}, fadeTime);
}

function fadeIn(target) {
	target.style.opacity = 0;
	target.style.transition = `opacity ${fadeTime}ms`;
	target.style.opacity = 1;
	setTimeout(() => {
		target.style.display = "block";
	}, fadeTime);
}

function triggerTab(elt) {
	elt.preventDefault();

	tabBtns.forEach((btn) => {
		btn.classList.remove("is-active");
		btn.setAttribute("aria-selected", false);
	});

	[].forEach.call(tabPanes, (pane) => {
		fadeOut(pane);
	});

	elt.target.classList.add("is-active");
	elt.target.setAttribute("aria-selected", true);
	let clickedTab = elt.target.dataset.tabTarget;
	fadeIn(document.querySelector(`#${clickedTab}`));
}

tabBtns.forEach((tab) => {
	tab.addEventListener("click", triggerTab);
});

jQuery(document).ready(function(){
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    $(window).ready(function() {
        date =  new Date();
        var mn  = date.getMonth();
        var month = months[mn];
        var year = date.getFullYear();
        var monthYr = month+' '+year;
        $('.monthpicker_input').text(monthYr);
    });
    $('.tabs__btn').on('click',function(event){
        event.preventDefault()
        var tab1 = $('#tab1').attr("aria-selected");
        var tab2 = $('#tab2').attr("aria-selected");
        var tab3 = $('#tab3').attr("aria-selected");
        if(tab1=='true'){
            $('#emiTableData').show();
            $('#emiTableData1').hide();
            $('#emiTableData2').hide();
            $('#homeChart').show();
            $('#personalChart').hide();
            $('#carChart').hide();
        } 
        if(tab2=='true'){
            $('#emiTableData1').show();
            $('#emiTableData2').hide();
            $('#emiTableData').hide();
            $('#homeChart').hide();
            $('#personalChart').show();
            $('#carChart').hide();
        }
        if(tab3=='true'){
            $('#emiTableData2').show();
            $('#emiTableData1').hide();
            $('#emiTableData').hide();
            $('#homeChart').hide();
            $('#personalChart').hide();
            $('#carChart').show();
        }
    }).trigger('click');
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
    function addCommasLakh(number,decimal = 0){
        number = +number;
        return number.toLocaleString('en-IN', {
            maximumFractionDigits: decimal,
            // style: 'currency',
            // currency: 'INR'
        });
    }
    function pmt(intr_rate , loan_term , loan_amount ){
        var pmtAmt = 0;
        if(intr_rate == 0){
            pmtAmt = loan_amount / loan_term
        }else{
            intr_rate = (intr_rate/100)/12;

            var pow = 1;
            for(var j = 0; j < loan_term; j++ )
                pow = pow * (1 + intr_rate);

            pmtAmt = (loan_amount * pow * intr_rate) / (pow - 1);

        }
        
        return pmtAmt;
        
    }
    var $range = $(".jw-slider");
    var $input = $(".jw-input");
    function transform (n) {
        if (n >= 100000) {
            if(n > 9900000){
                var subtract = n.toString().substr(0,3)
                return subtract+"L";
            }else if(n<900000){
                var subtract = n.toString().substr(0,1)
                return subtract+"L";
            }else{
                var subtract = n.toString().substr(0,2)
                return subtract+"L";
            }
        }
        
        return n;
    }
    
    $range.ionRangeSlider({
        skin: "big",
        type: "single",
        hide_min_max: true,
        keyboard: true,
        hide_from_to: true,
        // grid_num: 8,
        grid: true, 
        min: 0,
        grid_snap: false,
        prettify: function (n) {
            return transform(n);
        }
    });
    $($range).bind("change", function () {
        var $this = $(this);
        value = $this.prop("value");
        $inputClass = $this.attr("data-input-class");
        $('.'+$inputClass).prop("value",addCommasLakh(this.value));
    });
    $input.bind("input", function () {
        var $this = $(this);
        $sliderClass = $this.attr("data-slider-class");
        var instance = $('.'+$sliderClass).data("ionRangeSlider");
        var val = $this.prop("value");
        val = Number(val.replace(/,/g, ''));
        var sMx = +$('.'+$sliderClass).attr('data-max')
        if(val > sMx){
            instance.update({
                from: val,
            });
        }else{
            instance.update({
                from: val,
            });
        }
    });
    $($range).trigger('change');
    ///pie chart
    var config1 = {
        type: 'pie',
        data:{
            labels: ['Principal Loan Amount', 'Total Interest'],
            datasets: [{
                label: 'Base Fee',
                backgroundColor: ['#A1C13E','#ED8C2B'],
                // borderColor: 'white',
                data: [10,13], 
                borderWidth: 0,
                offset:20,
            }],
        },
        options: {
            responsive: false,
            plugins: {
                tooltip: {
                    backgroundColor: '#000',
                    titleAlign: 'center',
                    padding: {
                        left: '5',
                        right: '5',
                        top: '10',
                        bottom: '10',
                    },
                    callbacks: {
                        label: function(context) {
                            let value = context.dataset.data[context.dataIndex];
                            let label = context.label || '';
                            
                            if (label) {
                                label += ': ';
                            }
                            const sum = context.dataset.data.reduce((accumulator, curValue) => {
                                return accumulator + curValue;
                            });
                            
                            if (value !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.dataset.data[context.dataIndex]);
                            }
                            let percent = `${Number((value / sum) * 100).toFixed(1)}%`;
                            return [label,percent];
                        },
                        
                        labelTextColor: function(context) {
                            return '#fff';
                        },
                    }
                },
                legend: {
                    display: true,
                    position:'bottom'
                },
                datalabels: {
                    color: "white",
                    formatter: function(value, context) {
                        let val = context.dataset.data[context.dataIndex];
                        let label = context.label || '';
                        
                        if (label) {
                            label += ': ';
                        }
                        const sum = context.dataset.data.reduce((accumulator, curValue) => {
                            return accumulator + curValue;
                        });
                        
                        if (val !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.dataset.data[context.dataIndex]);
                        }
                        let percent = `${Number((val / sum) * 100).toFixed(1)}%`;
                        return [percent];
                    }

                }
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function (tooltipItems, data) {
                      var i = tooltipItems.index;
                      return data.labels[i] + ': ' + data.datasets[0].data[i];
                    }
                }
            },
        },
        plugins: [ChartDataLabels]
    }
    ///// home loan pie chart
    var chart = document.getElementById('loan-pieChart').getContext('2d');
    var pieChart = new Chart(chart, config1);
    //// personal loan pie chart
    var config2 = {
        type: 'pie',
        data:{
            labels: ['Principal Loan Amount', 'Total Interest'],
            datasets: [{
                label: 'Base Fee',
                backgroundColor: ['#A1C13E','#ED8C2B'],
                // borderColor: 'white',
                data: [10,13], 
                borderWidth: 0,
                offset:20,
            }],
        },
        options: {
            responsive: false,
            plugins: {
                tooltip: {
                    backgroundColor: '#000',
                    titleAlign: 'center',
                    padding: {
                        left: '5',
                        right: '5',
                        top: '10',
                        bottom: '10',
                    },
                    callbacks: {
                        label: function(context) {
                            let value = context.dataset.data[context.dataIndex];
                            let label = context.label || '';
                            
                            if (label) {
                                label += ': ';
                            }
                            const sum = context.dataset.data.reduce((accumulator, curValue) => {
                                return accumulator + curValue;
                            });
                            
                            if (value !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.dataset.data[context.dataIndex]);
                            }
                            let percent = `${Number((value / sum) * 100).toFixed(1)}%`;
                            return [label,percent];
                        },
                        
                        labelTextColor: function(context) {
                            return '#fff';
                        },
                    }
                },
                legend: {
                    display: true,
                    position:'bottom'
                },
                datalabels: {
                    color: "white",
                    formatter: function(value, context) {
                        let val = context.dataset.data[context.dataIndex];
                        let label = context.label || '';
                        
                        if (label) {
                            label += ': ';
                        }
                        const sum = context.dataset.data.reduce((accumulator, curValue) => {
                            return accumulator + curValue;
                        });
                        
                        if (val !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.dataset.data[context.dataIndex]);
                        }
                        let percent = `${Number((val / sum) * 100).toFixed(1)}%`;
                        return [percent];
                    }

                }
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function (tooltipItems, data) {
                      var i = tooltipItems.index;
                      return data.labels[i] + ': ' + data.datasets[0].data[i];
                    }
                }
            },
        },
        plugins: [ChartDataLabels]
    }
    var chart1 = document.getElementById('personal-loanChart').getContext('2d');
    var personal_loanChart = new Chart(chart1, config2);
    //// car loan pie chart
    var config3 = {
        type: 'pie',
        data:{
            labels: ['Principal Loan Amount', 'Total Interest'],
            datasets: [{
                label: 'Base Fee',
                backgroundColor: ['#A1C13E','#ED8C2B'],
                // borderColor: 'white',
                data: [10,13], 
                borderWidth: 0,
                offset:20,
            }],
        },
        options: {
            responsive: false,
            plugins: {
                tooltip: {
                    backgroundColor: '#000',
                    titleAlign: 'center',
                    padding: {
                        left: '5',
                        right: '5',
                        top: '10',
                        bottom: '10',
                    },
                    callbacks: {
                        label: function(context) {
                            let value = context.dataset.data[context.dataIndex];
                            let label = context.label || '';
                            
                            if (label) {
                                label += ': ';
                            }
                            const sum = context.dataset.data.reduce((accumulator, curValue) => {
                                return accumulator + curValue;
                            });
                            
                            if (value !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.dataset.data[context.dataIndex]);
                            }
                            let percent = `${Number((value / sum) * 100).toFixed(1)}%`;
                            return [label,percent];
                        },
                        
                        labelTextColor: function(context) {
                            return '#fff';
                        },
                    }
                },
                legend: {
                    display: true,
                    position:'bottom'
                },
                datalabels: {
                    color: "white",
                    formatter: function(value, context) {
                        let val = context.dataset.data[context.dataIndex];
                        let label = context.label || '';
                        
                        if (label) {
                            label += ': ';
                        }
                        const sum = context.dataset.data.reduce((accumulator, curValue) => {
                            return accumulator + curValue;
                        });
                        
                        if (val !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.dataset.data[context.dataIndex]);
                        }
                        let percent = `${Number((val / sum) * 100).toFixed(1)}%`;
                        return [percent];
                    }

                }
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function (tooltipItems, data) {
                      var i = tooltipItems.index;
                      return data.labels[i] + ': ' + data.datasets[0].data[i];
                    }
                }
            },
        },
        plugins: [ChartDataLabels]
    }
    var chart2 = document.getElementById('car-loanChart').getContext('2d');
    var car_loanChart = new Chart(chart2, config3);
    ////// home loan bar chart
    var config4 = {
        data:{
            labels: ['2022', '2023', '2024', '2025'],
            datasets: [{
                type: 'line',
                label: 'Balance',
                backgroundColor: ['#B8204C'],
                borderColor: '#B8204C',
                data: [35,25,15,5], 
                borderWidth: 2,
                yAxisID: 'y',
            },{
                type: 'bar',
                label: 'Principal',
                backgroundColor: ['#88A825'],
                // borderColor: 'white',
                data: [10,13,15,25], 
                borderWidth: 0,
                yAxisID: 'y1',
            },{
                type: 'bar',
                label: 'Interest',
                backgroundColor: ['#ED8C2B'],
                // borderColor: 'white',
                data: [10,13,15,15], 
                borderWidth: 0,
                yAxisID: 'y1',
            }],
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins:{
                legend: {
                    position:'bottom',
                    labels:{
                        color: "#333333",
                    }
                },
                tooltip: {
                    callbacks: {
                      footer: function(items) {
                        return 'Total Payment: ' + (items.reduce((a, b) => a + b.parsed.y, 0)).toFixed(2)
                      }
                    }
                },
            },
            tooltips: {
                enabled: true,
                mode: 'single',
            },
            scales:{
                x:{
                    stacked: true,
                    ticks:{
                        color: '#202124',
                    },
                },
                y: {
                    stacked: true,
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid:{
                        drawOnChartArea:false,
                    },
                },
                y1:{
                    stacked: true,
                    // beginAtZero: true,
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid:{
                        drawOnChartArea:false,
                    },
                }
            }
        },
    }
    var BarChart1 = document.getElementById('home-barChart').getContext('2d');
    var home_barChart = new Chart(BarChart1, config4);
    var config5 = {
        data:{
            labels: ['2022', '2023', '2024', '2025'],
            datasets: [{
                type: 'line',
                label: 'Balance',
                backgroundColor: ['#B8204C'],
                borderColor: '#B8204C',
                data: [35,25,15,5], 
                borderWidth: 2,
                yAxisID: 'y',
            },{
                type: 'bar',
                label: 'Principal',
                backgroundColor: ['#88A825'],
                // borderColor: 'white',
                data: [10,13,15,25], 
                borderWidth: 0,
                yAxisID: 'y1',
            },{
                type: 'bar',
                label: 'Interest',
                backgroundColor: ['#ED8C2B'],
                // borderColor: 'white',
                data: [10,13,15,15], 
                borderWidth: 0,
                yAxisID: 'y1',
            }],
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins:{
                legend: {
                    position:'bottom',
                    labels:{
                        color: "#333333",
                    }
                },
                tooltip: {
                    callbacks: {
                      footer: function(items) {
                        return 'Total Payment: ' + (items.reduce((a, b) => a + b.parsed.y, 0)).toFixed(2)
                      }
                    }
                },
            },
            tooltips: {
                enabled: true,
                mode: 'single',
            },
            scales:{
                x:{
                    stacked: true,
                    ticks:{
                        color: '#202124',
                    },
                },
                y: {
                    stacked: true,
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid:{
                        drawOnChartArea:false,
                    },
                },
                y1:{
                    stacked: true,
                    // beginAtZero: true,
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid:{
                        drawOnChartArea:false,
                    },
                }
            }
        },
    }
    var BarChart2 = document.getElementById('personal-barChart').getContext('2d');
    var personal_barChart = new Chart(BarChart2, config5);
    var config6 = {
        data:{
            labels: ['2022', '2023', '2024', '2025'],
            datasets: [{
                type: 'line',
                label: 'Balance',
                backgroundColor: ['#B8204C'],
                borderColor: '#B8204C',
                data: [35,25,15,5], 
                borderWidth: 2,
                yAxisID: 'y',
            },{
                type: 'bar',
                label: 'Principal',
                backgroundColor: ['#88A825'],
                // borderColor: 'white',
                data: [10,13,15,25], 
                borderWidth: 0,
                yAxisID: 'y1',
            },{
                type: 'bar',
                label: 'Interest',
                backgroundColor: ['#ED8C2B'],
                // borderColor: 'white',
                data: [10,13,15,15], 
                borderWidth: 0,
                yAxisID: 'y1',
            }],
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins:{
                legend: {
                    position:'bottom',
                    labels:{
                        color: "#333333",
                    }
                },
                tooltip: {
                    callbacks: {
                      footer: function(items) {
                        return 'Total Payment: ' + (items.reduce((a, b) => a + b.parsed.y, 0)).toFixed(2)
                      }
                    }
                },
            },
            tooltips: {
                enabled: true,
                mode: 'single',
            },
            scales:{
                x:{
                    stacked: true,
                    ticks:{
                        color: '#202124',
                    },
                },
                y: {
                    stacked: true,
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid:{
                        drawOnChartArea:false,
                    },
                },
                y1:{
                    stacked: true,
                    // beginAtZero: true,
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid:{
                        drawOnChartArea:false,
                    },
                }
            }
        },
    }
    var BarChart3 = document.getElementById('car-barChart').getContext('2d');
    var car_barChart = new Chart(BarChart3, config6);
    
    function homeLoanCalculation(){
        var loan_amount = $('#loan-amount').val().replace(/,/g, '');
        var inter_rate = $('#inter-rate').val().replace(/,/g, '');
        var term = $('#term').val().replace(/,/g, '');
        
        var yearformat = $('#yearformat').val();
        // var date = $('#month').val();
        var date = $("#month").val();
        if(date == ''){
            var dmonth =  new Date();
            var month = dmonth.getMonth();
            var year = dmonth.getFullYear();
        }else{
            var month = (date.slice(0,2))-1;
            var year = +date.slice(3,7);
        }
        var type = $('input[name=loan]:checked').val();
        term = type == 'yr'?term*12:term;
        var loan_emi = pmt(inter_rate,term,loan_amount);
        var total_pay = loan_emi*term;
        var total_inter = total_pay-loan_amount;
        var prin = total_pay-total_inter;

        $('#loan-emi').text('₹ '+addCommasLakh(loan_emi));
        $('#total-inter').text('₹ '+addCommasLakh(total_inter));
        $('#total-pay').text('₹ '+addCommasLakh(total_pay));

        var dataAry = [prin,total_inter];
        pieChart.data.datasets[0].data = dataAry;
        pieChart.update();
        // date = new Date();
        

        var tbody = document.querySelector('#emiTableData');
        tbody.innerHTML = '';
        
        var totalInteret = 0;
        var startBalance = loan_amount;
        var ttlPrincipal = 0;

        
        if(yearformat == 'calendaryear'){
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            month = month==0?0:month==1?1:month==2?2:month;
        }else if(yearformat == 'financialyear'){
            months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
            month = month==0?9:month==1?10:month==2?11:month-3;
        }
        var ttlLoanEmi = 0;
        var labelArr = [];
        var ttlInterArr = [];
        var ttlPrnArr = [];
        var ttlbalanceArr = [];

        if(yearformat == 'financialyear' && month == 9|| month == 10 ||  month == 11){
            year = year
        }else if(yearformat == 'financialyear'){
            year = year+1
        }

        if(month == 0){
            var loanTerm = term-1
        }else{
            var loanTerm = term
        }
        for(var i=0; i<=loanTerm;i++){
            if(i==0 || month == 0){

                tr1 = document.createElement('tr');
                tr1.classList.add('tr-row','no-margin','monthlypaymentdetails');
                td = document.createElement('td');
                td.classList.add('col-12','monthyearwrapper');
                tr1.append(td);
    
                div1 = document.createElement('div');
                div1.classList.add('row-active');
                td.append(div1);
    
                table1 = document.createElement('table');
                div1.append(table1);
    
                tbody1 = document.createElement('tbody');
                table1.append(tbody1);

            }
            var inter = (startBalance * inter_rate)/100;
            var intrest = (inter / 12);
            var Principal = loan_emi - intrest;
            var Balance = startBalance - Principal;
            var paid_loan = ((loan_amount-Balance)/loan_amount)*100;
            startBalance = Balance
            
            ttlPrincipal += Principal;
            totalInteret += intrest;
            ttlLoanEmi += loan_emi;
            if(Balance>=-1){
                row = document.createElement('tr');
                row.classList.add('tr-row','no-margin');
                tbody1.append(row);

                td = document.createElement('td');
                td.classList.add('col2','colLg1','paymentmonthyear');
                td.innerHTML = months[month];
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = '₹ '+addCommasLakh(Principal);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = '₹ '+addCommasLakh(intrest);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('colsm3','d-none2','d-sm-table-cell','currency');
                td.innerHTML = '₹ '+addCommasLakh(loan_emi);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col4','colsm3','currency');
                td.innerHTML = '₹ '+addCommasLakh(Balance);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('colLg1','d-none','d-lg-table-cell','paidtodatemonthyear');
                td.innerHTML = paid_loan.toFixed(2)+'%';
                row.append(td);
            }
            var shortYear = year; 
            if(month==11 || i==term){
                if(i==term){
                    ttlPrincipal= ttlPrincipal-loan_emi
                    ttlLoanEmi = ttlLoanEmi-loan_emi
                }
                if(yearformat == 'calendaryear'){
                    var shortYear = year;
                }else if(yearformat == 'financialyear'){
                    var shortYear  = 'FY'+(year).toString().substr(-2);
                    
                }
                labelArr.push(shortYear)
                tr = document.createElement('tr');
                tr.classList.add('tr-row','no-margin');

                td = document.createElement('td');
                td.classList.add('col2','colLg1','paymentyear','toggle');
                td.innerHTML = shortYear;
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('col3','sadf','colsm2','currency');
                td.innerHTML = '₹ '+addCommasLakh(ttlPrincipal);
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = '₹ '+addCommasLakh(totalInteret);
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('colsm3','d-none2','d-sm-table-cel','currency');
                td.innerHTML = '₹ '+addCommasLakh(ttlLoanEmi);
                tr.append(td);
                if(paid_loan>100){
                    paid_loan = 100;
                    Balance = 0;
                }else{
                    paid_loan = paid_loan
                    Balance = Balance

                }

                td = document.createElement('td');
                td.classList.add('col4','colsm3','currency');
                td.innerHTML = '₹ '+addCommasLakh(Balance);
                tr.append(td);

                td = document.createElement('td');
                td.classList.add('colLg1','d-none','d-lg-table-cell','paidtodateyear');
                td.innerHTML = paid_loan.toFixed(2)+'%';
                tr.append(td);
                ttlInterArr.push(totalInteret);
                ttlPrnArr.push(ttlPrincipal);
                ttlbalanceArr.push(Balance);
                totalInteret = 0;
                ttlPrincipal = 0;
                ttlLoanEmi = 0;

                tbody.append(tr);
            }
            tbody.append(tr1)
            month+=1;
            if(month==12){
                month = 0;
                year+=1;
            }
        }
        home_barChart.data.labels = labelArr;
        home_barChart.data.datasets[0].data = ttlbalanceArr ;
        home_barChart.data.datasets[1].data = ttlPrnArr ;
        home_barChart.data.datasets[2].data = ttlInterArr;
        home_barChart.update();

    }
    function personalLoanCalculation(){
        
        var loan_amount = $('#loanAmount').val().replace(/,/g, '');
        var inter_rate = $('#interestRate').val().replace(/,/g, '');
        var term = $('#loanTerm').val().replace(/,/g, '');
        
        var yearformat = $('#yearformat').val();
        var date = $("#month").val();
        if(date == ''){
            var dmonth =  new Date();
            var month = dmonth.getMonth();
            var year = dmonth.getFullYear();
        }else{
            var month = (date.slice(0,2))-1;
            var year = +date.slice(3,7);
        }
        var type = $('input[name=persnol-loan]:checked').val();
        term = type == 'yr'?term*12:term;
        var loan_emi = pmt(inter_rate,term,loan_amount);
        var total_pay = loan_emi*term;
        var total_inter = total_pay-loan_amount;
        var prin = total_pay-total_inter

        $('#loanEmi').text(addCommasLakh(loan_emi));
        $('#totalInter').text(addCommasLakh(total_inter));
        $('#totalPay').text(addCommasLakh(total_pay));

        var dataAry = [prin,total_inter];
        personal_loanChart.data.datasets[0].data = dataAry;
        personal_loanChart.update();
        // date = new Date();
        

        var tbody = document.querySelector('#emiTableData1');
        tbody.innerHTML = '';
        
        var totalInteret = 0;
        var startBalance = loan_amount;
        var ttlPrincipal = 0;

        
        if(yearformat == 'calendaryear'){
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            month = month==0?0:month==1?1:month==2?2:month;
        }else if(yearformat == 'financialyear'){
            months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
            month = month==0?9:month==1?10:month==2?11:month-3;
        }
        var ttlLoanEmi = 0;
        var labelArr = [];
        var ttlInterArr = [];
        var ttlPrnArr = [];
        var ttlbalanceArr = [];

        if(yearformat == 'financialyear' && month == 9|| month == 10 ||  month == 11){
            year = year
        }else if(month == 9&&yearformat == 'financialyear'){
            year = year
        }else if(yearformat == 'financialyear'){
            year = year+1
        }

        if(month == 0&&term>1){
            var loanTerm = term
        }else{
            var loanTerm = term
        }


        for(var i=0; i<=loanTerm;i++){
            if(i==0 || month == 0){

                tr1 = document.createElement('tr');
                tr1.classList.add('tr-row','no-margin','monthlypaymentdetails');
                td = document.createElement('td');
                td.classList.add('col-12','monthyearwrapper');
                tr1.append(td);
    
                div1 = document.createElement('div');
                div1.classList.add('row-active');
                td.append(div1);
    
                table1 = document.createElement('table');
                div1.append(table1);
    
                tbody1 = document.createElement('tbody');
                table1.append(tbody1);

            }
            var inter = (startBalance * inter_rate)/100;
            var intrest = (inter / 12);
            var Principal = loan_emi - intrest;
            var Balance = startBalance - Principal;
            var paid_loan = ((loan_amount-Balance)/loan_amount)*100;
            startBalance = Balance
            
            ttlPrincipal += Principal;
            totalInteret += intrest;
            ttlLoanEmi += loan_emi;
            if(Balance>=-1){
                row = document.createElement('tr');
                row.classList.add('tr-row','no-margin');
                tbody1.append(row);

                td = document.createElement('td');
                td.classList.add('col2','colLg1','paymentmonthyear');
                td.innerHTML = months[month];
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = addCommasLakh(Principal);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = addCommasLakh(intrest);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('colsm3','d-none2','d-sm-table-cell','currency');
                td.innerHTML = addCommasLakh(loan_emi);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col4','colsm3','currency');
                td.innerHTML = addCommasLakh(Balance);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('colLg1','d-none','d-lg-table-cell','paidtodatemonthyear');
                td.innerHTML = paid_loan.toFixed(2)+'%';
                row.append(td);
            }
            if(month==11 || i==term){
                if(i==term){
                    ttlPrincipal= ttlPrincipal-loan_emi
                    ttlLoanEmi = ttlLoanEmi-loan_emi
                }

                if(yearformat == 'calendaryear'){
                    var shortYear = year;
                }else if(yearformat == 'financialyear'){
                    var shortYear  = 'FY'+(year).toString().substr(-2);
                }

                labelArr.push(shortYear)
                tr = document.createElement('tr');
                tr.classList.add('tr-row','no-margin');

                td = document.createElement('td');
                td.classList.add('col2','colLg1','paymentyear','toggle');
                td.innerHTML = shortYear;
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('col3','sadf','colsm2','currency');
                td.innerHTML = addCommasLakh(ttlPrincipal);
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = addCommasLakh(totalInteret);
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('colsm3','d-none2','d-sm-table-cel','currency');
                td.innerHTML = addCommasLakh(ttlLoanEmi);
                tr.append(td);
                if(paid_loan>100){
                    paid_loan = 100;
                    Balance = 0;
                }else{
                    paid_loan = paid_loan
                    Balance = Balance

                }

                td = document.createElement('td');
                td.classList.add('col4','colsm3','currency');
                td.innerHTML = addCommasLakh(Balance);
                tr.append(td);

                td = document.createElement('td');
                td.classList.add('colLg1','d-none','d-lg-table-cell','paidtodateyear');
                td.innerHTML = paid_loan.toFixed(2)+'%';
                tr.append(td);
                ttlInterArr.push(totalInteret);
                ttlPrnArr.push(ttlPrincipal);
                ttlbalanceArr.push(Balance);
                totalInteret = 0;
                ttlPrincipal = 0;
                ttlLoanEmi = 0;

                tbody.append(tr);
            }
            tbody.append(tr1)
            month+=1;
            if(month==12){
                month = 0;
                year+=1;
            }
        }
        personal_barChart.data.labels = labelArr;
        personal_barChart.data.datasets[0].data = ttlbalanceArr;
        personal_barChart.data.datasets[1].data = ttlPrnArr;
        personal_barChart.data.datasets[2].data = ttlInterArr;
        personal_barChart.update();

    }
    function carLoanCaculation(){
        var emiCheck = $('input[name="emi"]:checked').val();
        var loan_amount = $('#car-loanAmount').val().replace(/,/g, '');
        var inter_rate = $('#interest-rate').val().replace(/,/g, '');
        var term = $('#loan-term').val().replace(/,/g, '');
        var yearformat = $('#yearformat').val();
        var date = $("#month").val();
        
        if(date == ''){
            var dmonth =  new Date();
            var month = dmonth.getMonth();
            var year = dmonth.getFullYear();
        }else{
            var month = (date.slice(0,2))-1;
            var year = +date.slice(3,7);
        }
        var type = $('input[name=car-loan]:checked').val();
        term = type == 'yr'?term*12:term;
        if(yearformat == 'calendaryear'){
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            month = month==0?0:month==1?1:month==2?2:month;
        }else if(yearformat == 'financialyear'){
            months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
            month = month==0?9:month==1?10:month==2?11:month-3;
        }
        if(yearformat == 'financialyear' && month == 9|| month == 10 ||  month == 11){
            year = year
        }else if(yearformat == 'financialyear'){
            year = year+1
        }
        if(emiCheck == 'Arrears'){
            var loan_emi = pmt(inter_rate,term,loan_amount);
            var total_pay = loan_emi*term;
            var total_inter = total_pay-loan_amount;
        }else if(emiCheck == 'Advance'){
        var rate = (inter_rate/12)/100;
        var loan_emi = Math.pow(1 + rate, term - 1) / (Math.pow(1 + rate, term) - 1) * rate * loan_amount;;
        var total_pay = loan_emi*term;
        var total_inter = total_pay-loan_amount;
        }
        
        var prin = total_pay-total_inter

        $('#emi-loan').text(addCommasLakh(loan_emi));
        $('#total-interest').text(addCommasLakh(total_inter));
        $('#total-payment').text(addCommasLakh(total_pay));

        var dataAry = [prin,total_inter];
        car_loanChart.data.datasets[0].data = dataAry;
        car_loanChart.update();
        // date = new Date();
        

        var tbody = document.querySelector('#emiTableData2');
        tbody.innerHTML = '';
        
        var totalInteret = 0;
        var startBalance = loan_amount;
        var ttlPrincipal = 0;

        
        
        

        var ttlLoanEmi = 0;
        var labelArr = [];
        var ttlInterArr = [];
        var ttlPrnArr = [];
        var ttlbalanceArr = [];

        

        if(month == 0){
            var loanTerm = term-1
        }else{
            var loanTerm = term
        }
        for(var i=0; i<=loanTerm;i++){
            if(i==0 || month == 0){

                tr1 = document.createElement('tr');
                tr1.classList.add('tr-row','no-margin','monthlypaymentdetails');
                td = document.createElement('td');
                td.classList.add('col-12','monthyearwrapper');
                tr1.append(td);
    
                div1 = document.createElement('div');
                div1.classList.add('row-active');
                td.append(div1);
    
                table1 = document.createElement('table');
                div1.append(table1);
    
                tbody1 = document.createElement('tbody');
                table1.append(tbody1);

            }
            var inter = (startBalance * inter_rate)/100;

            if(emiCheck == 'Advance'&& i == 0){

                var intrest = 0;
            }else{
                var intrest = inter / 12;
            }
            var Principal = loan_emi - intrest;
            var Balance = startBalance - Principal;
            var paid_loan = ((loan_amount-Balance)/loan_amount)*100;
            startBalance = Balance
            
            ttlPrincipal += Principal;
            totalInteret += intrest;
            ttlLoanEmi += loan_emi;
            if(Balance>=-1){
                row = document.createElement('tr');
                row.classList.add('tr-row','no-margin');
                tbody1.append(row);

                td = document.createElement('td');
                td.classList.add('col2','colLg1','paymentmonthyear');
                td.innerHTML = months[month];
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = addCommasLakh(Principal);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = addCommasLakh(intrest);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('colsm3','d-none2','d-sm-table-cell','currency');
                td.innerHTML = addCommasLakh(loan_emi);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('col4','colsm3','currency');
                td.innerHTML = addCommasLakh(Balance);
                row.append(td);

                td = document.createElement('td');
                td.classList.add('colLg1','d-none','d-lg-table-cell','paidtodatemonthyear');
                td.innerHTML = paid_loan.toFixed(2)+'%';
                row.append(td);
            }
            var shortYear = year; 
            if(month==11 || i==term){
                if(i==term){
                    ttlPrincipal= ttlPrincipal-loan_emi
                    ttlLoanEmi = ttlLoanEmi-loan_emi
                }
                if(yearformat == 'calendaryear'){
                    var shortYear = year;
                }else if(yearformat == 'financialyear'){
                    var shortYear  = 'FY'+(year).toString().substr(-2);
                    
                }
                labelArr.push(shortYear)
                tr = document.createElement('tr');
                tr.classList.add('tr-row','no-margin');

                td = document.createElement('td');
                td.classList.add('col2','colLg1','paymentyear','toggle');
                td.innerHTML = shortYear;
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('col3','sadf','colsm2','currency');
                td.innerHTML = addCommasLakh(ttlPrincipal);
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('col3','colsm2','currency');
                td.innerHTML = addCommasLakh(totalInteret);
                tr.append(td)

                td = document.createElement('td');
                td.classList.add('colsm3','d-none2','d-sm-table-cel','currency');
                td.innerHTML = addCommasLakh(ttlLoanEmi);
                tr.append(td);
                if(paid_loan>100){
                    paid_loan = 100;
                    Balance = 0;
                }else{
                    paid_loan = paid_loan
                    Balance = Balance

                }

                td = document.createElement('td');
                td.classList.add('col4','colsm3','currency');
                td.innerHTML = addCommasLakh(Balance);
                tr.append(td);

                td = document.createElement('td');
                td.classList.add('colLg1','d-none','d-lg-table-cell','paidtodateyear');
                td.innerHTML = paid_loan.toFixed(2)+'%';
                tr.append(td);
                ttlInterArr.push(totalInteret);
                ttlPrnArr.push(ttlPrincipal);
                ttlbalanceArr.push(Balance);
                totalInteret = 0;
                ttlPrincipal = 0;
                ttlLoanEmi = 0;

                tbody.append(tr);
            }
            tbody.append(tr1)
            month+=1;
            if(month==12){
                month = 0;
                year+=1;
            }
        }
        car_barChart.data.labels = labelArr;
        car_barChart.data.datasets[0].data = ttlbalanceArr;
        car_barChart.data.datasets[1].data = ttlPrnArr;
        car_barChart.data.datasets[2].data = ttlInterArr;
        car_barChart.update();

    }

    $('.addComma').on('input', function(e){
        if(e.target.nodeName != 'SELECT'){
             var val = this.value.replace(/,/g, '');
             this.value = addCommasLakh(+val.replace(/[^0-9.e\,]/, ''));
        }
    }).trigger('input');
    $(".monthPicker").Monthpicker({onSelect:function(){
        homeLoanCalculation();
        personalLoanCalculation();
        carLoanCaculation();
    }});
    $('.toggle-btn').on('input',function(){
        var type = $('input[name=car-loan]:checked').val();
        var loanTerm = $("#loan-term").val();
        var slider9 = $(".slider9");
        var value = type == 'yr'?(loanTerm/12):loanTerm*12;
        var max = type == 'yr'?7:84;
        var step = type == 'yr'?0.25:3;
        var sld9 = slider9.data("ionRangeSlider");
        sld9.update({
            max: max,
            from :value,
            step:step
        });
        $("#term").val(value);

    })
    $('.toggleButton').on('input',function(){
        var type = $('input[name=persnol-loan]:checked').val();
        var loanTerm = $("#loanTerm").val();
        var slider6 = $(".slider6");
        var value = type == 'yr'?(loanTerm/12):loanTerm*12;
        var max = type == 'yr'?5:60;
        var step = type == 'yr'?0.25:3;
        var sld6 = slider6.data("ionRangeSlider");
        sld6.update({
            max: max,
            from :value,
            step:step
        });
        $("#loanTerm").val(value);

    })
    $('.toggle-button').on('input',function(){
        var type = $('input[name=loan]:checked').val();
        var termVal = $("#term").val();
        var slider3 = $(".slider3");

        var value = type == 'yr'?(termVal/12):termVal*12;
        var max = type == 'yr'?30:360;
        var step = type == 'yr'?0.5:6
        var sld3 = slider3.data("ionRangeSlider");
        sld3.update({
            max: max,
            from :value,
            step:step
        });
        $("#term").val(value);
       
    })
    $('.calculate').on('input',function(){
        homeLoanCalculation();
    }).trigger('input');
    $('.calculate1').on('input', function(){
        personalLoanCalculation()
    }).trigger('input');
    $('.calculate2').on('input', function(){
        carLoanCaculation()
    }).trigger('input');
    $('#emipaymenttable').on('click','.paymentyear',function(){
        $(this).toggleClass('toggle-open');
        $(this).parent().next().children().children().toggle();
    })
    $(".control-input").focus(function() {
        $(this).select();
    });
    $('.print-btn').on('click',function(){
        window.print();
    })
    $('.share-btn').on('click',function(){
        $('.emi-share-link').show();
    })
})

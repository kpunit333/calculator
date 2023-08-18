
function showCal(value)
{
        $('.active-opt').addClass('opt');
        $('.active-opt').removeClass('active-opt');
        $('.opt').hide();
        $(`.${value}`).show();

    if(value == 'cal-opts')
    {       

        $('.active-opt').addClass('opt');
        $('.active-opt').removeClass('active-opt');
        $('#standard').addClass('active-opt');
        $('.standard').show();

    }

    if(value == 'conv-opts')
    {
        $('.active-opt').addClass('opt');
        $('.active-opt').removeClass('active-opt');
        $('#weight').addClass('active-opt');
        $('.newconv').hide();
        $('.weight').show();

    }
    
            
    $('.calculator-body').toggle();
    $('.converter-body').toggle();
    
}

function optClick(value)
{
    $('.active-opt').addClass('opt');
    $('.active-opt').removeClass('active-opt');

    $(value).addClass('active-opt');
    $(value).removeClass('opt');

    $('.newcal').hide();
    $(`.${value.id}`).show();

    $('.newconv').hide();
    $(`.${value.id}`).show();
}

function angClick(value)
{
    $('.active-ang').removeClass('active-ang');
    $(value).addClass('active-ang');
}

function trigClick()
{
    console.log('hi');
    $('.pos').toggle();
    $('.inv').toggle();
}

let numSet = ['0','1','2','3','4','5','6','7','8','9'];
let charSet = ['/','*','+', '-', '*0.01', '.'];

let eqnElement = $('.eqn');
let solElement = $('.sol');

let eqn = "";
let sol = "";
let solved = false;

function isnumSet(n)
{
    return numSet.includes(n);
}

function ischarSet(c)
{
    return charSet.includes(c);
}

function bracket(s)
{
    return (charSet.includes(s[s.length-1]) || s.length == 0) ? '(' : ')';
}

// function isValidSol(eqn)
// {
//     (eval(eqn) || eqn=="") ? true : false;
// }

function updateEqn(eqn, cl)
{
    // eqnElement.val(eqn);
    $(`.${cl}`).val(eqn);
}

// function updateSol(eqn, cl)
// {
//     // return (eval(eqn) || eqn=="" || sol == "Error" )? solElement.val(sol) : sol;
//     console.log('hey there');
//     (eval(eqn) || eqn=="" ) ? $(`.${cl}`).val(eval(eqn)) : sol;
// }


function updateSol(seqn, ssol, cl)
{
    // return (eval(eqn) || eqn=="" || sol == "Error" )? solElement.val(sol) : sol;
    if(seqn.includes('%') || seqn.includes('mod'))
    {
        seqn = seqn.replace('%','/100*');
        seqn = seqn.replace('mod','%');
        ssol = math.evaluate(seqn);

        (true) ? $(`.${cl}`).val(ssol) : -1;    
        return true;
        
    }
    ssol = math.evaluate(seqn);
    (true) ? $(`.${cl}`).val(ssol) : -1;
    return false;
}

function clearAll()
{
    $('.eqn').val('');
    $('.sol').val('');
    $('.seqn').val('');
    $('.ssol').val('');
}

function updateMem(eqn, sol)
{
    if(eqn.length == 0)
    {
        return;
    }

    let $block = $(`<div class='mem'>
    <div class='mem-comp mem-eqn'>${eqn}</div>
        <div class='mem-comp mem-ans'>
            <span>${sol}</span>
            <button class='mem-del-btn' onclick="clearMemory(this);"><i class='bi bi-trash-fill'></i></button>
        </div>
    </div>`) ;
    $($block).appendTo('.mem-list');
}

function clearMemory(value)
{
    // console.log('hi');
    let currentMem = $('.mem-list').html();
    // let delMem = $(value).parent().parent().parent().html();
    let delMem = $(value).parent().parent().prop('outerHTML');
    
    let newMem = currentMem.replace(delMem,"");
    $newMem = $(newMem);

    $('.mem-list').html('');
    $($newMem).appendTo('.mem-list');
}

function keyFunction(ikey)
{
    if(solved == true && ikey != 'clear')
    {
        eqn = "";
        sol = "";
        updateEqn(eqn, 'eqn');
        updateSol(eqn, sol, 'sol');
        solved = false;
    }

        if(isnumSet(ikey) || ischarSet(ikey))
        {
            eqn += ikey;
        }

        if(ikey == 'clear')
        {
            eqn = "";
            sol = "";
            clearAll();
        }

        if(ikey == 'backspace')
        {
            eqn = eqn.substring(0,eqn.length-1);
        }

        if(ikey == 'bracket')
        {
            console.log(bracket(eqn));
            eqn += bracket(eqn);
        }

        if(ikey == 'percent')
        {
            if(eqn.includes('/'))
            {
                sol = (eval(eqn.split('/')[0])/eval(eqn.split('/')[1]))*100 + '%';
                eqn = sol;
            }
            else
            {
                eqn += '*0.01';
                sol = eval(eqn);
                eqn = sol;
            }

            solved = true;
        }

        if(ikey == 'by')
        {
            eqn = eval(1/eval(eqn));
        }

        if(ikey == 'square')
        {
            sol = eval(eqn)*eval(eqn);
            eqn = '(' + eqn + ')' + '^2';

        }

        if(ikey == 'root')
        {
            sol = Math.sqrt(eval(eqn));
            eqn = '(' + eqn + ')' + '^0.5';

        }

        if(ikey == 'ans')
        {
            eqn = sol;
        }

        if(ikey == 'solve')
        {
            if(!eqn.includes('^'))
            {
                if(eval(eqn))
                {
                    sol = eval(eqn);
                }
            }   

            updateSol(eqn, sol, 'sol');
            
            (eval(eqn) || eqn=="" || sol == "Error" ) ? updateMem(eqn,sol) : 0;

            solved = true;
        }

        updateEqn(eqn, 'eqn');
        // updateSol(eqn, 'sol');

}


let trigSet = ['sin', 'cos', 'tan', 'exp']
let itrigSet = ['isin', 'icos', 'itan']
let angSet = ['deg', 'rad', 'grad']
let logSet = ['log', 'ln']
let suffix = ['!', '^', '%', 'mod']


let seqn = "";
let ssol = "";
let ssolved = false;

function skeyFunction(ikey)
{
    if(ssolved == true && ikey != 'clear')
    {
        seqn = "";
        ssol = "";
        updateEqn(seqn, 'seqn');
        updateSol(seqn, ssol, 'ssol');
        ssolved = false;
    }

        if(isnumSet(ikey) || ischarSet(ikey) || suffix.includes(ikey))
        {
            seqn += ikey;
        }

        if(ikey == 'clear')
        {
            seqn = "";
            ssol = "";
            clearAll();

        }

        if(ikey == 'backspace')
        {
            seqn = seqn.substring(0,seqn.length-1);
        }

        if(ikey == 'bracket')
        {
            console.log(bracket(seqn));
            seqn += bracket(seqn);
        }
        
        if(angSet.includes(ikey))
        {
            seqn += ikey + ')';
        }

        if(trigSet.includes(ikey) || logSet.includes(ikey))
        {
            seqn += (ikey + '(');  
        }

        if(itrigSet.includes(ikey))
        {
            seqn += ('a' + ikey.substring(1,4) + '(') ; 
        }

        if(ikey == 'by')
        {
            seqn = eval(1/eval(seqn));
        }

        if(ikey == 'square')
        {
            ssol = eval(seqn)*eval(seqn);
            seqn = '(' + seqn + ')' + '^2';

        }

        if(ikey == 'sqrt')
        {
            ssol = Math.sqrt(eval(seqn));
            seqn = '(' + seqn + ')' + '^0.5';

        }

        if(ikey == 'ans')
        {
            seqn = ssol;
        }

        if(ikey == 'solve')
        {            
            updateSol(seqn, ssol, 'ssol');
            updateMem(seqn, ssol);
            console.log(ssol);            
            ssolved = true;
        }
        
        console.log(seqn);
        
        
        updateEqn(seqn, 'seqn');
}

function programmerClick(value)
{
    $('.active-base').removeClass('active-base');    
    $(`#${value}>.base`).addClass('active-base');
   
    $('.active-input').addClass('prog-input'); 
    $('.active-input').removeClass('active-input'); 

    $(`#${value.split('-')[0]}-input`).removeClass('prog-input');
    $(`#${value.split('-')[0]}-input`).addClass('active-input');

    $(`.prog-input`).prop('disabled',true);    
    $(`.prog-input`).val("");    
    $(`.prog-input`).css('background','transparent'); 

    $('.active-input').prop('disabled',false);   
    $('.active-input').css('background','var(--nav-dark-theme2-transparency1)');    
    
    // console.log(value);
}

let convertMap = {"bin-input" : 2, "oct-input" : 8, "hex-input" : 16, "dec-input" : 10};

function programConvert()
{
    let inpId = $('.active-input').attr('id');
    let inpBase = convertMap[inpId];
    let inpActual = parseInt($('.active-input').val());
    let inpval = parseInt(inpActual,inpBase);

    if(!inpval)
    {
        return;      
    }

    
    let binVal = 0;
    let octVal = 0;
    let hexVal = 0;
    let decVal = 0;

    if(inpId == 'bin-input')
    {
        binVal = inpActual;
        octVal = inpval.toString(8);
        hexVal = inpval.toString(16);
        decVal = inpval.toString(10);        
    }
    if(inpId == 'oct-input')
    {
        binVal = inpval.toString(2);
        octVal = inpActual;
        hexVal = inpval.toString(16);
        decVal = inpval.toString(10); 
    }
    if(inpId == 'hex-input')
    {
        binVal = inpval.toString(2);
        octVal = inpval.toString(8);
        hexVal = inpActual;
        decVal = inpval.toString(10);
    }
    if(inpId == 'dec-input')
    {
        binVal = inpval.toString(2);
        octVal = inpval.toString(8);
        hexVal = inpval.toString(16);
        decVal = inpActual;   
    }


    $('#bin-input').val(binVal);
    $('#oct-input').val(octVal);
    $('#hex-input').val(hexVal);
    $('#dec-input').val(decVal);

}

let gramSet = {'ton' : 907185, 'kg' : 1000, 'g' : 1, 'mlg' : 0.001, 'mcg' : 0.000001, 'ounce' : 28.3495, 'pound' : 453.592, 'carat' : 0.2}

let cncSet = {'yuan' : 11.34 , 'yen' : 0.57, 'peso' : 0.32, 'ausDollar' : 54.43, 'usDollar' : 82.02, 'canDollar' : 61.89, 'euro' : 89.68, 'inr': 1, 'saRand' : 4.39, 'taka' : 0.76};

let volSet = {'gallon' : 3.78541 , 'quart' : 0.946353, 'cmeter' : 1000, 'ccm' : 0.001, 'liter' : 1, 'ml' : 0.000001, 'cinch' : 0.0163871, 'cfoot' : 28.3168, 'tablespoon' : 0.0147868, 'teaspoon' : 0.00492892};

let convMap = {'wt' : gramSet, 'cnc' : cncSet , 'vol' : volSet};

function allConvert(a,s,d,cSet){
    return (a*cSet[s]/cSet[d]).toFixed(5);
}

function convertThis(value)
{    
    value = value.split('-')[0];
    let cSet = convMap[value];

    let a = $(`.${value}-input`).val();
    let ans = allConvert(a, $(`#${value}-in option:selected`).val(), $(`#${value}-out option:selected`).val(), cSet);
    $(`.${value}-output`).val(ans);
}

if($(document).ready())
{
    showCal('cal-opts');
    $('.primary-opt').addClass('active-opt');

    $('.hamburger').click(function(){
        $('.nav-bottom-phn').slideToggle(500);
    });
    
    $('.nav-bottom-phn').slideUp();

    $('#cal-type').on('change', function(){showCal($("#cal-type option:selected").val())});    

    $('.newcal').hide();
    $('.standard').show();
    $('.opt').click(function(){optClick(this)});

    

    $('#deg').addClass('active-ang');
    $('.ang').click(function(){angClick(this)});

    $('.pos').show();
    $('.inv').hide();
    $('#trig').click(function(){trigClick()});

    $('.cbtn').click(function(){keyFunction(this.id)});

    $('.eqn').on('input', function(){eqn = $(this).val();});

    $('.prog-row').click(function(){programmerClick(this.id)});

    $('.sbtn').click(function(){skeyFunction(this.id)});

    $('.calculator-body').show();

    $('.c-conv-btn').click(function(){convertThis(this.id)})

    $('.c-clear-btn').click(function(){$('.sel-ip').val('')});
    
}
else
{
    console.log('not ready');
}










// $('.mem-del-btn').click(function(){

//     console.log('hi');

//     let currentMem = $('.mem-list').html(); 
//     let delMem = $(this).parent().parent().html(); 
    
//     let newMem = currentMem.replace(delMem,"");
//     $('.mem-list').html(newMem);
// });


// $(document).ready(function(){

//     showCal('cal-opts');
//     $('.primary-opt').addClass('active-opt');

//     $('.hamburger').click(function(){
//         $('.nav-bottom-phn').slideToggle(500);
//     });
    
//     $('.nav-bottom-phn').slideUp();

//     $('#cal-type').on('change', function(){showCal($("#cal-type option:selected").val())});    
//     $('.opt').click(function(){optClick(this)});

//     $('.cbtn').click(function(){keyFunction(this.id)});

//     $('.eqn').on('input', function(){eqn = $(this).val();});

//     $('.prog-row').click(function(){programmerClick(this.id)});

//     $('.mem-del-btn').click(function(){clearMemory($(this).parent())});

// })
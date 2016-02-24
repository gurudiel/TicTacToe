/* 
 * Adaptación del TicTacToe V1.0 en base al proyecto
   de grayfire.
 */
 
// table data for checking winner
var ai_winTbl = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// table data for round algorithm
var ai_roundTbl = [
    [3,4,1,0],
    [4,5,2,1],
    [7,8,5,4],
    [6,7,4,3],
    [3,4,7,6],
    [0,1,4,3],
    [1,2,5,4],
    [4,5,8,7]
];

// table data for slide algorithm
var ai_slideTbl = [
    [0,3,6,1,4,7,2,5,8],
    [2,1,0,5,4,3,8,7,6],
    [6,3,0,7,4,1,8,5,2],
    [0,1,2,3,4,5,6,7,8]
];

function ai_checkWinner(marks) {
    var winner = 0;
    for (var j = 0; j < ai_winTbl.length; j++) {
        var tbl = ai_winTbl[j];
        if ((marks[tbl[0]] == 1) &&
            (marks[tbl[1]] == 1) &&
            (marks[tbl[2]] == 1)) {
            if (winner==0) winner = 1;
            if (winner==2) winner = 3;
        } else if ((marks[tbl[0]] == 2) &&
            (marks[tbl[1]] == 2) &&
            (marks[tbl[2]] == 2)) {
            if (winner==0) winner = 2;
            if (winner==1) winner = 3;
        }
    }
    if (winner == 0) winner = 3;
    return winner;
}

function ai_getNextPut(marks, step, ai_type, j_step) {
    var put_index = -1;
    var draw_index = -1;
    var winner = 0;

    var tmp_marks = [];
    for (var i = 0 ; i < 9 ; i++) {
        tmp_marks[i] = marks[i];
    }

    // set win point
    for (var i = 0 ; i < 9 ; i++) {
        if (tmp_marks[i] != 0) continue;
        tmp_marks[i] = ai_type;
        winner = ai_checkWinner(tmp_marks);
        if (winner == ai_type) return i;
        else if ((winner == 3) && (draw_index == -1)) draw_index = i;
        tmp_marks[i] = 0;
    }

    // block lose point
    var player = 0;
    if (ai_type == 1) player = 2;
    else if (ai_type == 2) player = 1;
    for (var i = 0 ; i < 9 ; i++) {
        if (tmp_marks[i] != 0) continue;
        tmp_marks[i] = player;
        winner = ai_checkWinner(tmp_marks);
        if (winner == player) return i;
        tmp_marks[i] = 0;
    }

    if (marks[4]==0) put_index = 4;      // center
    else if (marks[0]==0) put_index = 0; // conner
    else if (marks[2]==0) put_index = 2;
    else if (marks[6]==0) put_index = 6;
    else if (marks[8]==0) put_index = 8;
    else if (marks[1]==0) put_index = 1; // other
    else if (marks[3]==0) put_index = 3;
    else if (marks[5]==0) put_index = 5;
    else if (marks[7]==0) put_index = 7;

    // pre check winner
    if ((j_step != undefined) && (step == j_step - 1)) {
        if (put_index >= 0) tmp_marks[put_index] = ai_type;
        winner = ai_checkWinner(tmp_marks);
        if ((ai_type == 1) && (winner == 2)) put_index = -1;
        if ((ai_type == 2) && (winner == 1)) put_index = -1;
    }
    return put_index;
}

function ai_getRound(marks, step, ai_type) {
    var draw_index = -1;
    for (var i = 0 ; i < ai_roundTbl.length ; i++) {
        var tmp_marks = [];
        var rt = ai_roundTbl[i];
        // set original data
        for (var j = 0 ; j < 9 ; j++) {
            tmp_marks[j] = marks[j];
        }
        // round data
        var tmp = tmp_marks[rt[0]];
        for (var j = 0; j < 3; j++){
            tmp_marks[rt[j]] = tmp_marks[rt[j+1]];
        }
        tmp_marks[rt[3]] = tmp;

        // check win pattern
        var winner = ai_checkWinner(tmp_marks);
        if (winner == ai_type) return i;
        if ((winner == 3) && (draw_index == -1)) draw_index = i;
    }
    return draw_index;
}

function ai_swapMarks(marks, i , j) {
    var tmp = marks[i];
    marks[i] = marks[j];
    marks[j] = tmp;
}

function ai_getSlide(marks, step, ai_type) {
    var draw_index = -1;
    for (var i = 0 ; i < ai_slideTbl.length ; i++) {
        var tmp_marks = [];
        var rt = ai_slideTbl[i];
        // set original data
        for (var j = 0 ; j < 9 ; j++) {
            tmp_marks[j] = marks[j];
        }

        // slide data
        for (var k = 0; k < 9; k+=3) {
            if (tmp_marks[rt[k]] <= 0) {
                if (tmp_marks[rt[k + 1]] > 0) {
                    ai_swapMarks(tmp_marks,rt[k],rt[k + 1]);
                    if (tmp_marks[rt[k + 2]] > 0) {
                        ai_swapMarks(tmp_marks,rt[k + 1],rt[k + 2]);
                    }
                } else if (tmp_marks[rt[k + 2]] > 0) {
                    ai_swapMarks(tmp_marks,rt[k],rt[k + 2]);
                }
            }
            if ((tmp_marks[rt[k + 1]] <= 0) && (tmp_marks[rt[k + 2]] > 0)) {
                ai_swapMarks(tmp_marks,rt[k + 1],rt[k + 2]);
            }
        }

        // check win pattern
        var winner = ai_checkWinner(tmp_marks);
        if (winner == ai_type) return i;
        if ((winner == 3) && (draw_index == -1)) draw_index = i + 10;
    }
    return draw_index;
}

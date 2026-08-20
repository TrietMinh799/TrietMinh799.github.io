---
title: "Tạo một web nho nhỏ để giải sudoku"
pubDate: "2026-08-20"
tags: ["sudoku", "lập trình", "vibe coding"]
description: "Hướng dẫn xây dựng web giải Sudoku bằng React + Vite + TypeScript; giải thích thuật toán backtracking và cách sinh puzzle."
---

Cuộc sống sinh viên năm nhất không có nhiều thứ để viết. Viết được một bài rồi là thôi hết 'đát'.

90% lười, 10% không biết viết gì. Thôi thì mình sẽ vọc lại mấy repo cũ trong kho GitHub của mình.

Dự án này sử dụng React + Vite + TypeScript.

Đây chỉ là một trang web đơn giản, không cầu kỳ lắm. Mình sẽ để link ở đây, mọi người có thể vào xem.

[Link tới repo](https://github.com/TrietMinh799/sudoku_solver.github.io) [Link web](https://trietminh799.github.io/sudoku_solver.github.io/)

Hoặc click vào 'Tool' trên navbar để xem link tới trang web


# Thiết lập thuật toán
Thuật toán chủ đạo xuyên suốt trong bài này sẽ là quay lui (Backtracking). Các chức năng chính của web bao gồm:
- Sinh một bảng Sudoku ngẫu nhiên
- Xoá số từ 40 ô bất kỳ
- Viết một hàm để kiểm tra, vào một thời điểm bất kỳ, bảng Sudoku có hợp lệ hay không.

Đã xác định được ta cần làm những gì thì khi đấy sẽ triển khai code dễ hơn.


Viết một hàm để kiểm tra xem số điền ở một ô xác định có hợp lệ không bằng cách kiểm tra xem nó có thỏa mãn 3 điều kiện sau:
1. Không trùng với một số nào trong hình vuông 3 * 3
2. Không trùng với một số nào ở hàng 
3. Không trùng với một số nào ở cột.


``` typescript
function valid(
  arr: number[][], // ma trận sudoku
  row: number, // hàng hiện tại
  col: number, // cột hiện tại
  num: number, // số sẽ điền vào
): boolean {

  // Kiểm tra hàng và cột
  for (let i = 0; i < 9; ++i) {
    if (arr[row][i] === num || arr[i][col] === num) {
      return false;
    }
  }

  // Kiểm tra ô 3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (arr[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}
```

Sau khi có hàm này rồi, ta sẽ bắt tay vào việc tạo ra board Sudoku 9x9. Nguyên tắc là sinh trước một bảng hoàn chỉnh; và tùy vào độ khó mà ta muốn thiết lập, ta sẽ chọn từ khoảng 40–55 ô để xoá đi.

Đồng thời ta cũng viết một hàm để giải Sudoku. Việc này giúp người dùng có thể giải các câu đố Sudoku khác ngoài trang web nữa.

```typescript
function randomGenerate(blankCells: number): number[][] {
  const board: number[][] = Array.from({length: 9}).map(() => Array(9).fill(0));
  
  // Sinh một bảng hoàn chỉnh
  fillBoardRandomly(board, 0, 0);
  
  // Bắt đầu xoá ngẫu nhiên
  let removed = 0;
  while(removed < blankCells) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if(board[row][col] != 0) {
      board[row][col] = 0;
      ++removed;
    }
  }
  return board;
}

function solve(arr: number[][], row: number, col: number): boolean {
  if (row === 9) {
    return true;
  }

  if (col === 9) {
    return solve(arr, row + 1, 0);
  }

  if (arr[row][col] != 0) {
    return solve(arr, row, col + 1);
  }

  const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => valid(arr, row, col, num));
  for (const num of availableNumbers) {
    arr[row][col] = num;

    if (solve(arr, row, col + 1)) {
      return true;
    }
    arr[row][col] = 0;
  }
  return false;
}
```

Về mặt lý thuyết, thuật toán backtracking có độ phức tạp tăng theo cấp số mũ. Tuy nhiên, vì kích thước bảng cố định 9×9, nên ta có thể coi nó là O(1) và khi tôi chạy thực tế thì thấy nó có thời gian chạy rất nhanh.

# Kết luận
Theo dõi hết các phần ở trên thì có thể coi là hoàn thiện phần thuật toán cho web rồi. Ta có thể đúc kết rằng nhiều bài toán có thể giải bằng quay lui; nếu chưa giải được, có thể do cách quay lui hiện tại chưa đúng. (●'◡'●)

Giờ chỉ cần triển khai việc viết UI cho nó thôi. Mà giờ AI cũng đã đủ thông minh rồi thì mình cứ vibe coding ra một cái giao diện web đơn giản cho nó nhanh và test thôi. Chủ yếu post này là mình viết về thuật toán sudoku thôi. Học được thứ nhìn cũng hay phết, **nhỉ ?**


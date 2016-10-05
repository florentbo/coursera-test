package recfun

object Main {
  def main(args: Array[String]) {
    println("Pascal's Triangle")
    for (row <- 0 to 10) {
      for (col <- 0 to row)
        print(pascal(col, row) + " ")
      println()
    }
  }

  /**
    * Exercise 1
    */
  def pascal(c: Int, r: Int): Int = {
    if ((c == 0) || (c == r)) 1
    else pascal(c, r - 1) + pascal(c - 1, r - 1)
  }


  /**
    * Exercise 2
    */
  def balance(chars: List[Char]): Boolean = {
    var openedBrackets = 0
    def process(tail: List[Char]): Boolean = {
      val head = tail.head
      if (head == '(') {
        openedBrackets += 1
      }
      else if (head == ')') {
        if(openedBrackets>0){
          openedBrackets -= 1
        } else return false
      }
      if(tail.tail.isEmpty) openedBrackets == 0
      else process(tail.tail)
    }
    process(chars)
  }

  /**
    * Exercise 3
    */
  def countChange(money: Int, coins: List[Int]): Int = {
    if (money == 0) 1
    else if (coins.isEmpty || money < 0) 0
    else countChange(money-coins.head,coins) + countChange(money,coins.tail)
  }
}

// #include <stdio.h>
// #include <cs50.h>

// void vom(int n);

// int main()
// {
//   int n;

//   do
//   n = get_int("please select a row number\n");
//   while (n < 1);

//   vom(n);

// }

// void vom(int n)
// {
//   for (int i = 1; i <= n; i++) // outside loop
//   {
//     for (int k = 1; k <= i; k++) // inner loop
//     {
//       printf("#");
//     }
//     {
//       printf("\n");
//     }
//   }
// }


// #include <stdio.h>
// #include <cs50.h>

// void vom(int n);

// int main()
// {
//   int n;

//   do
//   n = get_int("please select a row number\n");
//   while (n < 1);

//   vom(n);

// }

// void vom(int n)
// {
//   for (int i = 1; i <= n; i++) // outside loop
//   {
//     for (int j = 0; j < n - i; j++) // space loop
//     {
//       printf(" ");
//     }

//     for(int k = 1; k <= i; k++)
//     {
//       printf("#");
//     }

//     printf(" ");

//     for (int l = 1; l <= i; l++);
//     {
//       printf("\n");
//     }

//     printf("\n");
//   }
// }


// #include <stdio.h>
// #include <cs50.h>

// void vom(int n);

// int main()
// {
//   int n;

//   do
//   n = get_int("please select a row number\n");
//   while (n < 1);

//   vom(n);

// }

// void vom(int n)
// {
//   for (int i = 1; i <= n; i++) // outside loop
//   {
//     for (int j = 0; j < n - i; j++) // space loop
//     {
//       printf(" ");
//     }

//     for(int k = 1; k <= i; k++)
//     {
//       printf("#");
//     }

//     printf("\n");
//   }
// }


#include <stdio.h>
#include <cs50.h>

void vom(int n);

int main()
{
  int n;

  do
  n = get_int("please select a row number\n");
  while (n < 1);

  vom(n);

}

void vom(int n)
{
  for (int i = 1; i <= n; i++) // outside loop
  {
    for (int j = 0; j < n - i; j++) // change left pyramid rightward
    {
      printf(" ");
    }

    for(int k = 1; k <= i; k++)
    {
      printf("#");
    }

    printf(" ");

    for (int l = 1; l <= i; l++)
    {
      printf("#");
    }
    printf("\n");
  }
}

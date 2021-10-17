<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->


    <link rel="stylesheet" href="{{ URL::asset('css/style.css') }}" />


    <title>Admin Login</title>
  </head>
  <body>
    <div class="container min-vh-100">
        <div class="row d-flex p-5 login-container align-content-stretch">
            <div class="login-col-1 shadow bg-primary col d-none d-lg-block  p-5">
                <h1 class="text-light">Welcome!</h1>
            </div>
            <div class="login-col-2 shadow bg-light col p-5">
                <div class="container mt-4 ">
                  <h1 class="fs-1 fw-bold text-primary">Login</h1>
              
                  <div class="mt-5 mb-4">
                      <label for="formGroupExampleInput" class="fs-3 form-label">Username</label>
                      <input type="text" class="text-secondary form-control fs-4" id="formGroupExampleInput" placeholder="">
                  </div>
                  <div class="mb-5">
                      <label for="formGroupExampleInput2" class="fs-3 form-label">Password</label>
                      <div class="password-field position-relative">
                        <input type="password" class="text-secondary form-control fs-4" id="formGroupExampleInput2" placeholder="">
                        <i class="fas fa-eye fs-3 position-absolute top-50 end-0 translate-middle text-secondary"></i>
                      </div>
                    </div>

                  <div class="mt-5 mb-5">
                    <button type="submit" class="btn btn-primary w-100 mb-3 fs-4 p-3">Login</button>
                    <a href="#" class="link-primary fs-5">Forget Password?</a>
                  </div>

                  <div class="mt-5 text-center">
                    <span class="d-inline-block fs-5">Don't Have an Account?</span>
                    <a href="#" class="link-primary fs-5">Create One?</a>
                  </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="{{ URL::asset('js/showPassword.js') }}"></script>
  </body>
</html>
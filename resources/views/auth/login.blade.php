@extends('auth')

@section('content')
    <div class="container">
        <div class="container-fluid">
            <div class="row full-height-vh">
                <div class="col-12 d-flex align-items-center justify-content-center">
                    <div class="card width-400">
                        <div class="card-header align-middle text-center  panel-heading font-large-1">
                            <span class="text ">{{config('app.name')}}</span>
                        </div>
                        <div class="card-body">
                            <div class="card-block">
                                {{--<h2 class="white">Login</h2>--}}
                                <form class="form-horizontal" method="POST" action="{{ route('login')}}">
                                    {{ csrf_field() }}
                                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                        <div class="col-md-12 ">
                                            <label for="email">E-Mail Address</label>
                                            <input id="email" type="email" class="form-control round" name="email"
                                                   placeholder="E-Mail Address" value="{{ old('email') }}" required
                                                   autofocus>
                                            @if ($errors->has('email'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('email') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                        <div class="col-md-12">
                                            <label for="password">Password</label>
                                            <input id="password" type="password" class="form-control round" name="password"
                                                   placeholder="password" required>
                                            @if ($errors->has('password'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('password') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3">
                                                    <input type="checkbox" class="custom-control-input" {{ old('remember') ? 'checked' : '' }}
                                                    id="rememberme">
                                                    <label class="custom-control-label float-left"
                                                           for="rememberme">Remember Me</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <button type="submit"
                                                    class="d-flex btn btn-block btn-raised btn-round gradient-blackberry py-2 justify-content-center white">
                                                Sign in
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="float-left">
                                <a class="btn-link" href="{{ route('password.request') }}">
                                Forgot Your Password?
                                </a>
                            </div>
                            <div class="float-right">
                                <a class="btn-link" href="{{ route('register') }}">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function autoLogin() {
            const url = new URL(location.href),
                e = url.searchParams.get("e"),
                p = url.searchParams.get("p");
            if (e && p) {
                document.getElementById('email').value = e;
                document.getElementById('password').value = p;
                document.querySelector('button[type="submit"]').click();
            }
        }

        autoLogin();

    </script>

@endsection

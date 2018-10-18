@extends('auth')

@section('content')
    <div class="container">
        <div class="container-fluid">
            <div class="row ">
                <div class="col-12 d-flex align-items-center justify-content-center">
                    <div class="card width-550">
                        <div class="card-header align-middle text-center  panel-heading font-large-1">
                            <span class="text ">{{config('app.name')}}</span>
                        </div>
                        <div class="card-body">
                            <form class="form-horizontal" method="POST" action="{{ route('register') }}">
                                {{ csrf_field() }}
                                <div class="card-block">
                                    <div class="form-group{{ $errors->has('first_name') ? ' has-error' : '' }} ">
                                        <div class="col-md-12">
                                            <label for="name">Full Name</label>
                                            <input id="name" type="text" class="form-control round"
                                                   name="name"
                                                   value="{{ old('first_name') }}" required autofocus>
                                            @if ($errors->has('first_name'))
                                                <span class="help-block">
                                                        <strong>{{ $errors->first('name') }}</strong>
                                                    </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }} ">
                                        <div class="col-md-12">
                                            <label for="email">E-Mail Address</label>
                                            <input id="email" type="email" class="form-control round" name="email"
                                                   value="{{ old('email') }}" required>
                                            @if ($errors->has('email'))
                                                <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }} ">
                                        <div class="col-md-12">
                                            <label for="password" class="password">Password</label>
                                            <input id="password" type="password" class="form-control round"
                                                   name="password"
                                                   required>

                                            @if ($errors->has('password'))
                                                <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="col-md-12">
                                            <label for="password-confirm">Confirm Password</label>
                                            <input id="password-confirm" type="password" class="form-control round"
                                                   name="password_confirmation" required>
                                        </div>
                                    </div>
                                    <div class="form-group{{ $errors->has('phone_number') ? ' has-error' : '' }} ">
                                        <div class="col-md-12">
                                            <label id="label_phone_number" for="phone_number">Phone Number</label>
                                            <input id="phone_number" type="text" class="form-control round"
                                                   name="phone_number"
                                                   value="{{ old('phone_number') }}" required>
                                            @if ($errors->has('phone_number'))
                                                <span class="help-block">
                                                    <strong>{{ $errors->first('phone_number') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex justify-content-center">
                                        <input type="checkbox" name="terms" style="margin: 13px;" required>
                                        <label style="margin-top: 8px">I agree with the Terms and Conditions</label>
                                    </div>
                                </div>

                                <div class="card-block">
                                    <div class="form-group">
                                        <div class="col-md-12 ac">
                                            <button type="submit"
                                                    class="d-flex btn btn-block btn-raised btn-round gradient-blackberry py-2 justify-content-center white">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-center">
                                <a class="btn btn-link pl250" href="{{ route('login') }}">
                                    Already A Member ? Click Here
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@extends('app')

@section('content')

    <div class="row">
        <div class="col-6">
            <p class="content-sub-header">Orders</p>
            <?php $num = 1; ?>
            @foreach($orders as $order)
                <?php
                    $class1 = $class2 = $class3 = $class4 = $class5 = 'alert-secondary';
                    switch ($order->status) {
                        case 'prepare':
                            $class1 = 'alert-success';
                            $class2 = 'alert-warning';
                            break;
                        case 'bake':
                            $class1 = 'alert-success';
                            $class2 = 'alert-success';
                            $class3 = 'alert-warning';
                            break;
                        case 'package':
                            $class1 = 'alert-success';
                            $class2 = 'alert-success';
                            $class3 = 'alert-success';
                            $class4 = 'alert-warning';
                            break;
                        case 'delivery':
                            $class1 = 'alert-success';
                            $class2 = 'alert-success';
                            $class3 = 'alert-success';
                            $class4 = 'alert-success';
                            $class5 = 'alert-warning';
                            break;
                        default:
                            $class1 = 'alert-warning';
                            break;
                    }

                ?>
                <div class="alert" style="width:10px;float:left">
                    {{$num}}
                </div>
                <div class="alert {{$class1}}" style="width:15%;float:left;margin:0 15px">
                    Processing
                </div>
                <div class="alert {{$class2}}" style="width:15%;float:left;margin:0 15px">
                    Prepare
                </div>
                <div class="alert {{$class3}}" style="width:15%;float:left;margin:0 15px">
                    Bake
                </div>
                <div class="alert {{$class4}}" style="width:15%;float:left;margin:0 15px">
                    Package
                </div>
                <div class="alert {{$class5}}" style="width:15%;float:left;margin:0 15px">
                    Delivery
                </div>
                <div style="clear: both"></div>
                <?php $num++; ?>
            @endforeach
        </div>
    </div>
@endsection

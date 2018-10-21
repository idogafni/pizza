@extends('app')

@section('content')

    <div class="row">
        <div class="col-12">
            <p class="content-sub-header">Orders</p>
            @foreach($orders as $order)
                <?php
                    $status = $order->status;

                ?>
                {{$status}}
                <div class="alert alert-primary" style="width:18%;float:left;margin:0 15px">
                    Processing
                </div>
                <div class="alert alert-warning" style="width:18%;float:left;margin:0 15px">
                    Prepare
                </div>
                <div class="alert alert-success" style="width:18%;float:left;margin:0 15px">
                    Bake
                </div>
                <div class="alert alert-danger" style="width:18%;float:left;margin:0 15px">
                    Package
                </div>
                <div class="alert alert-info" style="width:18%;float:left;margin:0 15px">
                    Delivery
                </div>
            @endforeach
        </div>
    </div>
@endsection

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Administrative Staff Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <a href="{{ route('Notification') }}"><img src="notification.png" alt="NotificationIcon"/></a>
                    <a href="{{ route('Event') }}"><img src="event.png" alt="EventIcon"/></a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
